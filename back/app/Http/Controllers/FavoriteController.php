<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;

class FavoriteController extends Controller
{
    public function store($request)
    {
        DB::beginTransaction();
        try {
            Favorite::create([
                'user_id' => $request->user_id,
                'dish_id' => $request->dish_id
            ]);

            DB::commit();

            // 成功時のレスポンス
            return response()->json([
                "success" => true,
                "message" => "追加に成功しました"
            ]);

        } catch (\Exception $e) {

            DB::rollBack();
            
            // 失敗時のレスポンス
            return response()->json([
                    "success" => false,
                    "message" => "追加に失敗しました"
            ]);
        }
    }
}
