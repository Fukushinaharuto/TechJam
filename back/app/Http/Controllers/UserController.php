<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function me(Request $request)
    {
        $user = $request->user(); // または Auth::user();

        return response()->json([
            'name' => $user->name,
            'image_url' => $user->image_url,
        ]);
    }
}
