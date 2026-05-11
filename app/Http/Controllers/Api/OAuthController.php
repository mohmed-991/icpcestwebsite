<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class OAuthController extends Controller
{
    private function getFrontendUrl($path = '') {
        return rtrim(env('FRONTEND_URL', 'http://localhost:5173'), '/') . $path;
    }

    public function redirectToCodeforces()
    {
        $clientId = env('CODEFORCES_CLIENT_ID');
        $redirectUri = env('CODEFORCES_REDIRECT_URI', url('/api/oauth/codeforces/callback'));

        $url = 'https://codeforces.com/oauth/authorize?' . http_build_query([
            'client_id' => $clientId,
            'redirect_uri' => $redirectUri,
            'response_type' => 'code',
            'scope' => 'profile',
        ]);

        return redirect($url);
    }

    public function handleCodeforcesCallback(Request $request)
    {
        $code = $request->get('code');
        
        if (!$code) {
            return redirect($this->getFrontendUrl('/register?error=oauth_failed'));
        }

        try {
            $clientId = env('CODEFORCES_CLIENT_ID');
            $clientSecret = env('CODEFORCES_CLIENT_SECRET');
            $redirectUri = env('CODEFORCES_REDIRECT_URI', url('/oauth/codeforces/callback'));

            $response = Http::withoutVerifying()->asForm()->post('https://codeforces.com/oauth/token', [
                'client_id' => $clientId,
                'client_secret' => $clientSecret,
                'grant_type' => 'authorization_code',
                'code' => $code,
                'redirect_uri' => $redirectUri,
            ]);

            if (!$response->successful()) {
                // يمكنك تسجيل الخطأ هنا لمعرفة السبب (Log::error($response->body()))
                return redirect($this->getFrontendUrl('/register?error=token_exchange_failed'));
            }

            if (!$response->successful()) {
                return redirect($this->getFrontendUrl('/register?error=token_exchange_failed'));
            }

            $accessToken = $response->json()['access_token'];

            $userResponse = Http::withoutVerifying()->withToken($accessToken)
                ->get('https://codeforces.com/api/user.info');
            
            if (!$userResponse->successful() || !isset($userResponse->json()['result'][0])) {
                return redirect($this->getFrontendUrl('/register?error=user_info_failed'));
            }

            $userData = $userResponse->json();
            $cfUser = $userData['result'][0];

            $existingUser = User::where('codeforces_handle', $cfUser['handle'])->first();
            
            if ($existingUser) {
                // توحيد منطق التوكن مع RegisterController و LoginController
                if (!$existingUser->api_token) {
                    $existingUser->api_token = Str::random(80);
                    $existingUser->save();
                }
                $token = $existingUser->api_token;
                return redirect($this->getFrontendUrl('/register?token=' . $token . '&existing=true'));
            }

            $handle = $cfUser['handle'];
            $name = trim(($cfUser['firstName'] ?? '') . ' ' . ($cfUser['lastName'] ?? ''));
            $email = $cfUser['email'] ?? '';
            $rating = $cfUser['rating'] ?? 0;

            session([
                'cf_handle' => $handle,
                'cf_email' => $email,
                'cf_name' => $name,
                'cf_rating' => $rating,
            ]);
            session()->save();

            $queryString = http_build_query([
                'handle' => $handle,
                'name' => $name,
                'email' => $email,
                'rating' => $rating,
                'oauth' => 'true'
            ]);

            return redirect($this->getFrontendUrl('/register?' . $queryString));

        } catch (\Exception $e) {
            return redirect($this->getFrontendUrl('/register?error=' . urlencode($e->getMessage())));
        }
    }

    public function getOAuthData()
    {
        return response()->json([
            'handle' => session('cf_handle'),
            'email' => session('cf_email'),
            'name' => session('cf_name'),
            'rating' => session('cf_rating'),
        ]);
    }
}