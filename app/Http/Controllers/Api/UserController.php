<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class UserController extends Controller
{
    protected function authenticate(Request $request)
    {
        $token = $request->bearerToken();
        if (!$token) {
            return null;
        }

        return User::where('api_token', $token)->first();
    }

    public function user(Request $request)
    {
        $user = $this->authenticate($request);
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $cfInfo = $this->fetchCodeforcesInfo($user->codeforces_handle);

        return response()->json([
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'college' => $user->college,
            'department' => $user->department,
            'codeforcesHandle' => $user->codeforces_handle,
            'rating' => $user->rating,
            'codeforces' => $cfInfo,
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = $this->authenticate($request);
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone' => 'required|string',
            'department' => 'required|string',
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->department = $request->department;
        $user->save();

        return response()->json(['message' => 'Profile updated successfully']);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'No user found for that email'], 404);
        }

        $token = Str::random(60);
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            ['token' => Hash::make($token), 'created_at' => Carbon::now()]
        );

        return response()->json([
            'message' => 'Reset token generated. Use this token to reset your password.',
            'resetToken' => $token,
        ]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $record = DB::table('password_reset_tokens')->where('email', $request->email)->first();
        if (!$record || !Hash::check($request->token, $record->token)) {
            return response()->json(['message' => 'Invalid or expired reset token'], 400);
        }

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Password successfully reset']);
    }

    protected function fetchCodeforcesInfo(string $handle): array
    {
        $data = ['solved' => 0, 'rank' => null, 'maxRating' => null, 'maxRank' => null];

        try {
            $response = Http::get('https://codeforces.com/api/user.info?handles=' . urlencode($handle));
            if ($response->successful() && $response->json()['status'] === 'OK') {
                $userData = $response->json()['result'][0];
                $data['rank'] = $userData['rank'] ?? null;
                $data['maxRating'] = $userData['maxRating'] ?? null;
                $data['maxRank'] = $userData['maxRank'] ?? null;
            }

            $statusResponse = Http::get('https://codeforces.com/api/user.status?handle=' . urlencode($handle) . '&from=1&count=1000');
            if ($statusResponse->successful() && $statusResponse->json()['status'] === 'OK') {
                $submissions = $statusResponse->json()['result'];
                $solved = [];
                foreach ($submissions as $submission) {
                    if (($submission['verdict'] ?? '') === 'OK') {
                        $problem = $submission['problem'];
                        $key = $problem['contestId'] . '_' . $problem['index'];
                        $solved[$key] = true;
                    }
                }
                $data['solved'] = count($solved);
            }
        } catch (\Exception $e) {
            // ignore external API failures
        }

        return $data;
    }
}
