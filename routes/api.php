<?php

use App\Http\Controllers\Api\CompileController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\TrainingController;
use App\Http\Controllers\Api\TrackingController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\OAuthController;
use App\Http\Controllers\API\LevelController;
use App\Http\Controllers\API\LessonController;
use App\Http\Controllers\API\ProblemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/oauth/codeforces', [OAuthController::class, 'redirectToCodeforces']);
Route::get('/oauth/codeforces/callback', [OAuthController::class, 'handleCodeforcesCallback']);
Route::get('/oauth/data', [OAuthController::class, 'getOAuthData']);

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::get('/user', [UserController::class, 'user']);
Route::put('/user/profile', [UserController::class, 'updateProfile']);
Route::post('/forgot-password', [UserController::class, 'forgotPassword']);
Route::post('/reset-password', [UserController::class, 'resetPassword']);
Route::get('/trainings', [TrainingController::class, 'index']);
Route::post('/admin/training', [TrainingController::class, 'store']);
Route::post('/compile', [CompileController::class, 'compile']);
Route::get('/standings', [TrackingController::class, 'standings']);

// Training Platform Routes
Route::apiResource('levels', LevelController::class)->only(['index', 'show']);
Route::apiResource('lessons', LessonController::class)->only(['index', 'show']);
Route::apiResource('problems', ProblemController::class)->only(['index', 'show']);