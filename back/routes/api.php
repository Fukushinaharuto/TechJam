<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DishController;
use App\Http\Controllers\ReviewController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/reviews', [ReviewController::class, 'store']);

Route::post('/registration', [AuthController::class, 'registration']);

Route::post('/dish', [DishController::class, 'store']);