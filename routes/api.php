<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MessageController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::get('current-user', 'currentUser');
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('logout', 'logout');
    });
});

Route::controller(TicketController::class)->group(function () {
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('support', 'index');
    });
});

Route::controller(UserController::class)->group(function () {
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('users', 'index');
    });
});

Route::controller(CategoryController::class)->group(function () {
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('categories', 'index');
    });
});

Route::controller(MessageController::class)->group(function () {
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('messages', 'index');
    });
});