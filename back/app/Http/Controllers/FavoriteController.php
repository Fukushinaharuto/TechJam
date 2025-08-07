<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function store($request)
    {
        DB::beginTransaction();
        try {
            Faborite::create([
                'user_id' => $request->user_id,
                'post_id' => $request->dish_id
            ])
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json({
                [
                    "success" => false,
                    "message" => "追加に失敗しました"
                ]
            });
        }
        return response()->json([
            "success" => true,
            "message" => "追加に成功しました"
        ]);
        DB::commit();
    }
}
