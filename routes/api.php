<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::get('current-user', 'currentUser');
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('logout', 'logout');
    });
});
