<?php

namespace App\Http\Controllers;
use App\Http\Requests\RegisterRequest; 
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Storage;


class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        try{
            $validatedData = $request->validated();
            if(Auth::attempt(['name' => $validatedData['name'], 'password' => $validatedData['password']])){
                $user = Auth::user();
                $token = $user->createToken('token')->plainTextToken;
                return response()->json([
                    'token' => $token,
                    'success' => true
                ], 200);
            }else{
                return response()->json([
                    'success' => false,
                    'messages' => ["ユーザー名またはパスワードが間違っています"]
                ]);
            }
        }catch(\Exception $e){
            return response()->json([
                'success' => false,
                'messages' => ["予期せぬエラーが発生しました"]
            ]);
        }
    }
    
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
        }catch(\Exception $e){
            return response()->json([
                'success' => false,
                'messaages' => ["ユーザー名が使用されているか、パスワードが間違っています"]
            ]);
        }
    }
}
