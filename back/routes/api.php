<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DishController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\ReviewController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/dish', [DishController::class, 'store']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'index']);
    Route::post('/user/update', [UserController::class, 'update']);
    Route::get('/user/image', [UserController::class, 'image']);
    Route::post('restaurant/store', [RestaurantController::class, 'store']);
    Route::post('dish/store', [DishController::class, 'store']);
    Route::get('restaurant/select', [RestaurantController::class, 'select']);
    Route::get('dish/select', [DishController::class, 'select']);
    Route::post('review/store', [ReviewController::class, 'store']);
    Route::get('review/select', [ReviewController::class, 'select']);
    Route::get('/restaurant', [RestaurantController::class, 'index']);
});