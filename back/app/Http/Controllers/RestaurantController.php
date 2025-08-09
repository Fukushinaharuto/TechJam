<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;

class RestaurantController extends Controller
{
    public function select()
    {
        $restaurants = Restaurant::select('id', 'name')->get();
        return response()->json([
            'restaurants' => $restaurants
        ]);
    }

    public function index()
    {
        $restaurants = Restaurant::all();
        return response()->json([
            'restaurants' => $restaurants
        ]);
    }
}
