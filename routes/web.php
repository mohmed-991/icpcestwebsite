<?php

use Illuminate\Support\Facades\Route;

// Redirect web routes to React Frontend
Route::get('/', function () {
    // في التطوير: redirect للـ React dev server
    if (env('APP_ENV') === 'local') {
        return redirect(env('FRONTEND_URL', 'http://localhost:5173'));
    }
    // في الإنتاج: serve صفحة Index من frontend
    return file_get_contents(public_path('index.html'));
});

Route::get('/{any}', function () {
    if (env('APP_ENV') === 'local') {
        return redirect(env('FRONTEND_URL', 'http://localhost:5173') . '/' . request()->path());
    }
    return file_get_contents(public_path('index.html'));
})->where('any', '.*');
Route::fallback(function () {
    if (config('app.env') === 'local') {
        return redirect(env('FRONTEND_URL', 'http://localhost:5173') . '/' . request()->path());
    }
    return file_get_contents(public_path('index.html'));
});
