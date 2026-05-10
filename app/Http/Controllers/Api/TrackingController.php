<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TrackingController extends Controller
{
    public function standings(Request $request)
    {
        $apiUrl = config('services.sheet.api_url');
        if (!$apiUrl) {
            return response()->json(['message' => 'Sheet API URL not configured'], 500);
        }

        $params = array_filter([
            'key' => config('services.sheet.api_key'),
            'secret' => config('services.sheet.api_secret'),
            'group' => $request->query('group'),
        ]);

        $response = Http::get($apiUrl, $params);
        if (!$response->successful()) {
            return response()->json(['message' => 'Unable to fetch standings from sheet API', 'details' => $response->body()], 502);
        }

        return response()->json($response->json());
    }
}
