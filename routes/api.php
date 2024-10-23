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

Route::middleware(['auth:sanctum'])->group(function () {
    Route::put('tickets/{ticket}/assign', [TicketController::class, 'updateAssigned']);
    Route::get('messages/ticket/{id}', [MessageController::class, 'showForTicket']);
    Route::get('users/admins', [UserController::class, 'showAdmins']);
    Route::apiResources([
        'tickets' => TicketController::class,
        'users' => UserController::class,
        'categories' => CategoryController::class,
        'messages' => MessageController::class,
    ]);
});