<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function regist(RegisterRequest $request)
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