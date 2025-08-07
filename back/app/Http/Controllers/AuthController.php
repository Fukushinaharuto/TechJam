<?php

namespace App\Http\Controllers;
use App\Http\Requests\RegisterRequest; 
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
    public function register(RegisterRequest $request)
    {
        try{
            $requestData = $request->validated();
            $user = User::create([
                'name' => $requestData['name'],
                'password' => $requestData['password']
            ]);
            $token = $user->createToken('token')->plainTextToken;
            return response()->json([
                'token' => $token,
                'success' => true,
            ]);
        }catch(e){
            return response()->json([
                'success' => false,
                'messaages' => ["メールアドレスまたはパスワードが間違っています"]
            ]);
        }
    }
}
