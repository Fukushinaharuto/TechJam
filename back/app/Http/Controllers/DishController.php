<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shop;

class DishController extends Controller
{
    public function getDishesByShop(Request $request)
    {
        $id = $request->query('id');
        $shop = Shop::with('dishes')->findOrFail($id);
        $dishNames = $shop->dishes->pluck('name');
        return response()->json($dishNames);
    }
}

