<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoomController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthController::class, 'create']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/me', [AuthController::class, 'me']);
    // Room
    Route::get('/room', [RoomController::class, 'getAll']);
    // Route::get('/savings', [SavingController::class, 'getAll']);

    // Route::get('/loans', [LoanController::class, 'index']);
    // Route::post('/loans', [LoanController::class, 'store']);

    // Route::post('/settlement', [SettlementController::class, 'store']);

    Route::middleware('role:admin')->group(function () {
        // Room
        Route::post('/room', [RoomController::class, 'create']);
        // Route::get('/savings/{id}', [SavingController::class, 'getById']);
        Route::put('/room/{id}', [RoomController::class, 'update']);
        Route::delete('/room/{id}', [RoomController::class, 'destroy']);

        //Loans
        // Route::post('/loans/approve/{id}', [LoanController::class, 'approve']);
        // Route::post('/loans/reject/{id}', [LoanController::class, 'reject']);

        //Settlements
        // Route::get('/settlement', [SettlementController::class, 'index']);
        // Route::post('/settlement/approve/{id}', [SettlementController::class, 'approve']);
        // Route::post('/settlement/reject/{id}', [SettlementController::class, 'reject']);
    });
});
