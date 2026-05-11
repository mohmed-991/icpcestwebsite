<?php

use Illuminate\Support\Str;

return [

    'driver' => env('SESSION_DRIVER', 'file'), // يفضل 'file' أو 'database' في البداية للتأكد

    'lifetime' => (int) env('SESSION_LIFETIME', 120),

    'expire_on_close' => env('SESSION_EXPIRE_ON_CLOSE', false),

    'encrypt' => env('SESSION_ENCRYPT', false),

    'files' => storage_path('framework/sessions'),

    'connection' => env('SESSION_CONNECTION'),

    'table' => env('SESSION_TABLE', 'sessions'),

    'store' => env('SESSION_STORE'),

    'lottery' => [2, 100],

    'cookie' => env(
        'SESSION_COOKIE',
        Str::slug((string) env('APP_NAME', 'laravel')).'_session'
    ),

    'path' => env('SESSION_PATH', '/'),

    // مهم جداً: سيبه null أو خليه localhost عشان يشتغل على الـ React بورت 5173
    'domain' => env('SESSION_DOMAIN', null),

    // لازم تكون false طالما إنت شغال HTTP مش HTTPS
    'secure' => env('SESSION_SECURE_COOKIE', false),

    'http_only' => env('SESSION_HTTP_ONLY', true),

    // التعديل الجوهري: خليه 'lax' عشان يسمح بالـ Redirect من كود فورس
    'same_site' => 'lax', 

    'partitioned' => env('SESSION_PARTITIONED_COOKIE', false),

    'serialization' => 'json',

];