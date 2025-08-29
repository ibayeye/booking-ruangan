<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\RoomController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthController::class, 'create']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/me', [AuthController::class, 'me']);
    // Room
    Route::get('/room', [RoomController::class, 'getAll']);

    // Booking
    Route::post('/booking', [BookingController::class, 'create']);
    Route::get('/booking', [BookingController::class, 'getAll']);
    Route::put('/booking/{id}', [BookingController::class, 'update']);
    Route::delete('/booking/{id}', [BookingController::class, 'destroy']);

    Route::middleware('role:admin')->group(function () {
        // Room
        Route::post('/room', [RoomController::class, 'create']);
        Route::put('/room/{id}', [RoomController::class, 'update']);
        Route::delete('/room/{id}', [RoomController::class, 'destroy']);

        // Booking
        Route::post('/booking/approve/{id}', [BookingController::class, 'approve']);
        Route::post('/booking/reject/{id}', [BookingController::class, 'reject']);
    });
});
