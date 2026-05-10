<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CompileController extends Controller
{
    public function compile(Request $request)
    {
        $request->validate([
            'language' => 'required|string|in:cpp',
            'code' => 'required|string',
            'stdin' => 'nullable|string',
        ]);

        $language = $request->language;
        $code = $request->code;
        $stdin = $request->stdin ?? '';

        // Check if JDoodle credentials are configured
        $clientId = env('JDOODLE_CLIENT_ID');
        $clientSecret = env('JDOODLE_CLIENT_SECRET');

        if (!$clientId || !$clientSecret || $clientId === 'your_client_id') {
            return response()->json([
                'status' => 'error',
                'message' => 'C++ compiler service not configured. Please sign up for JDoodle API at https://www.jdoodle.com/compiler-api and add your credentials to the .env file.',
            ], 500);
        }

        // Use JDoodle API for compilation
        $response = Http::timeout(30)->withoutVerifying()->post('https://api.jdoodle.com/v1/execute', [
            'script' => $code,
            'language' => 'cpp',
            'versionIndex' => '3', // C++17
            'clientId' => $clientId,
            'clientSecret' => $clientSecret,
            'stdin' => $stdin,
        ]);

        if ($response->successful()) {
            $data = $response->json();
            
            $status = 'success';
            if (isset($data['statusCode']) && $data['statusCode'] !== 200) {
                $status = 'error';
            }
            
            return response()->json([
                'status' => $status,
                'stdout' => $data['output'] ?? '',
                'stderr' => $data['error'] ?? '',
                'timeout' => false,
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Compiler service temporarily unavailable. Please try again later.',
            ], 500);
        }
    }
}
