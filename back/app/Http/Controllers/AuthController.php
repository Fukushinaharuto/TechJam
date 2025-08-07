<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

public function login(LoginRequest $request)
    {
        $validatedData = $request->validated();
        if(Auth::attempt(['email' => $validatedData['email'], 'password' => $validatedData['password']])){
            $user = Auth::user();
            $token = $user->createToken('login_token')->plainTextToken;
            return response()->json([
                'token' => $token,
            ], 200);
        }else{
            return response()->noContent(401);
        }
    }

class AuthController extends Controller
{
    public function registration(RegisterRequest $request)
    {
        $requestData = $request->validated();
        $user = User::create([
            'name' => $requestData['name'],
            'email' => $requestData['email'],
            "phone_number" => $requestData['phone_number'],
            'password' => $requestData['password']
        ]);
        return response()->noContent(202);
    }
}
