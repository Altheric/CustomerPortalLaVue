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
    Route::post('register', 'register');
    Route::get('current-user', 'currentUser');
    Route::post('forgot-password', 'forgotPassword');
    Route::put('update-password', 'updatePassword');
    Route::delete('clear-request/{email}', 'clearToken');
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('logout', 'logout');
    });
});

Route::controller(TicketController::class)->group(function () {
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('tickets', 'index');
        Route::post('tickets', 'store');
        Route::put('tickets/{ticket}', 'update');
        Route::put('tickets/{ticket}/assign', 'updateAssigned');
    });
});

Route::controller(UserController::class)->group(function () {
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('users', 'index');
        Route::put('users/{id}', 'update');
        Route::delete('users/{id}', 'destroy');
    });
});

Route::controller(CategoryController::class)->group(function () {
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('categories', 'index');
        Route::post('categories', 'store');
        Route::put('categories/{id}', 'update');
        Route::delete('categories/{id}', 'destroy');
    });
});

// Route::resource('categories', CategoryController::class);

Route::controller(MessageController::class)->group(function () {
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('messages', 'index');
        Route::post('messages', 'store');
        Route::put('messages/{id}', 'update');
        Route::delete('messages/{id}', 'destroy');
    });
});