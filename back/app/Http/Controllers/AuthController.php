<?php

namespace App\Http\Controllers;
use App\Http\Requests\RegisterRequest; 
use Illuminate\Http\Request;

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