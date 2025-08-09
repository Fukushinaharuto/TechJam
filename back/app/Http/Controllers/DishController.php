<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restrant;
use App\Models\Dish;
use App\Models\DishImage;
use App\Models\Restaurant;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\DishRequest;

class DishController extends Controller
{
    public function select(Request $request)
    {
        $dishes = Dish::select('id', 'name')->get();
        return response()->json([
            'dishes' => $dishes
        ]);
    }

    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
            $requestData = $request->all();
            // ✅ レストランIDが送られてきた場合はそのまま使用
            if (!empty($requestData['restaurantId'])) {
                $restaurantId = $requestData['restaurantId'];
            } else {
                // ✅ Google Place ID に該当するレストランがすでに存在するか確認
                $restaurant = Restaurant::where('id', $requestData['restaurantId'])->first();
                
                // ✅ なければ新規作成
                if (!$restaurant) {
                    $restaurant = Restaurant::create([
                        'name' => $requestData['restaurant'],
                        'place_id' => $requestData['placeId'],
                        'latitude' => $requestData['lat'],
                        'longitude' => $requestData['lng'],
                    ]);
                }

                $restaurantId = $restaurant->id;
            }

            // ✅ 料理の保存
            $dish = Dish::create([
                'name' => $requestData['dish'],
                'price' => $requestData['price'],
                'restaurant_id' => $restaurantId,
            ]);


            DB::commit();
            return response()->noContent(202);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => '保存に失敗しました。', 'message' => $e->getMessage()], 500);
        }
    }

}