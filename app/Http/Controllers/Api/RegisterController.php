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
        // 1. استرجاع بيانات السيشين للتأكد من حالة الـ OAuth
        $oauthHandle = session('cf_handle');
        $isOAuth = $oauthHandle && ($oauthHandle === $request->codeforcesHandle);

        // 2. الـ Validation
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'phone' => 'required',
            'department' => 'required',
            'codeforcesHandle' => 'required|string|unique:users,codeforces_handle', // التأكد إنه مش متسجل قبل كدة
            'password' => $isOAuth ? 'nullable' : 'required|string|min:8|confirmed',
        ]);

        if ($isOAuth) {
            // بيانات جاية من السيشين (OAuth)
            $cfData = [
                'rating' => session('cf_rating', 0), 
                'email' => session('cf_email')
            ];
            $password = Hash::make(Str::random(24)); 
        } else {
            // تسجيل يدوي: لازم نتحقق من الهاندل عبر API كود فورس
            try {
                $response = Http::withoutVerifying()->timeout(10)->get("https://codeforces.com/api/user.info?handles={$request->codeforcesHandle}");
                
                // التأكد إن الرد OK وإن الهاندل موجود فعلاً
                if (!$response->successful() || $response->json('status') !== 'OK') {
                    return response()->json(['message' => 'هذا الهاندل غير موجود على كود فورس، تأكد من كتابته بشكل صحيح.'], 422);
                }

                $cfData = $response->json()['result'][0];
                $password = Hash::make($request->password);
            } catch (\Exception $e) {
                return response()->json(['message' => 'تعذر الاتصال بكود فورس حالياً، حاول مرة أخرى.'], 503);
            }
        }

        // 3. إنشاء المستخدم
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $password,
            'phone' => $request->phone,
            'college' => 'Minia University',
            'department' => $request->department,
            'codeforces_handle' => $request->codeforcesHandle,
            'rating' => $cfData['rating'] ?? 0,
            'api_token' => Str::random(80),
        ]);

        // 4. تنظيف السيشين بعد النجاح
        if ($isOAuth) {
            session()->forget(['cf_handle', 'cf_email', 'cf_rating', 'cf_name']);
            session()->save(); 
        }

        return response()->json([
            'message' => 'تم التسجيل بنجاح!',
            'token' => $user->api_token, 
            'user' => $user
        ]);
    }
}