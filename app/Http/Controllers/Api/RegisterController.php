<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'phone' => 'required',
            'department' => 'required',
            'codeforcesHandle' => 'required',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // Check if this is an OAuth registration
        $oauthHandle = session('cf_handle');
        if ($oauthHandle && $oauthHandle === $request->codeforcesHandle) {
            $cfData = [
                'rating' => session('cf_rating', 0),
                'email' => session('cf_email'),
            ];
        } else {
            $response = Http::get("https://codeforces.com/api/user.info?handles={$request->codeforcesHandle}");
            if ($response->json()['status'] !== 'OK') {
                return response()->json(['message' => 'Invalid Codeforces handle'], 400);
            }
            $cfData = $response->json()['result'][0];
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'college' => 'Egyptian University of Science and Technology',
            'department' => $request->department,
            'codeforces_handle' => $request->codeforcesHandle,
            'rating' => $cfData['rating'] ?? 0,
            'api_token' => Str::random(80),
        ]);

        session()->forget(['cf_handle', 'cf_email', 'cf_rating']);

        return response()->json([
            'token' => $user->api_token,
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'college' => $user->college,
                'department' => $user->department,
                'codeforcesHandle' => $user->codeforces_handle,
                'rating' => $user->rating,
            ],
        ]);
    }
}
