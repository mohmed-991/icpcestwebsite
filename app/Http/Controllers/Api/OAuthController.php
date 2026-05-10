<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class OAuthController extends Controller
{
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
            return redirect('/register?error=oauth_failed');
        }

        try {
            $clientId = env('CODEFORCES_CLIENT_ID');
            $clientSecret = env('CODEFORCES_CLIENT_SECRET');
            $redirectUri = env('CODEFORCES_REDIRECT_URI', url('/api/oauth/codeforces/callback'));

            $response = Http::asForm()->post('https://codeforces.com/oauth/token', [
                'client_id' => $clientId,
                'client_secret' => $clientSecret,
                'grant_type' => 'authorization_code',
                'code' => $code,
                'redirect_uri' => $redirectUri,
            ]);

            if (!$response->successful()) {
                return redirect('/register?error=oauth_failed');
            }

            $tokenData = $response->json();
            $accessToken = $tokenData['access_token'];

            $userResponse = Http::withToken($accessToken)->get('https://codeforces.com/api/user.info?handles=' . urlencode($request->get('handle')));
            if (!$userResponse->successful()) {
                return redirect('/register?error=user_info_failed');
            }

            $userData = $userResponse->json();
            if (!isset($userData['status']) || $userData['status'] !== 'OK') {
                return redirect('/register?error=user_info_failed');
            }

            $cfUser = $userData['result'][0];

            $existingUser = User::where('codeforces_handle', $cfUser['handle'])->first();
            if ($existingUser) {
                $token = $existingUser->api_token ?: $existingUser->generateApiToken();
                return redirect('/register?token=' . $token . '&existing=true');
            }

            session([
                'cf_handle' => $cfUser['handle'],
                'cf_email' => $cfUser['email'] ?? null,
                'cf_name' => trim(($cfUser['firstName'] ?? '') . ' ' . ($cfUser['lastName'] ?? '')),
                'cf_rating' => $cfUser['rating'] ?? 0,
            ]);

            return redirect('/register?oauth=codeforces');
        } catch (\Exception $e) {
            return redirect('/register?error=oauth_error');
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
