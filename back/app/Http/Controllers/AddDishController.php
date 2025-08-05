<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AddDishController extends Controller
{
    public function addDishes(AddDishRequest $request)
    {
        $requestData = $request->validated();
        $dish = dish::create([
            'restaurant_id' => $requestData['restaurant_id'],
            'name' => $requestData['name'],
            'price' => $requestData['price'],
            'description' => $requestData['description'],
        ]);
        DB::beginTransaction();
        try {
            foreach ($requestData['imageUrl'] as $url) {
                dish_image::create([
                    'dish_id' => $dish->id,
                    'image_url' => $url,
                ]);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => '画像の保存に失敗しました。'], 500);
        }
        DB::commit();
        return response()->noContent(202);
    }
}
