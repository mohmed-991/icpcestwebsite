<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'identity' => 'required|string',
            'password' => 'required|string',
        ]);

        $identity = $request->input('identity');
        $user = User::where('email', $identity)
            ->orWhere('codeforces_handle', $identity)
            ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->api_token ?: $user->generateApiToken();

        return response()->json([
            'token' => $token,
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
