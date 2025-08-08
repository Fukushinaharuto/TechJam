<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(){
        $favoraite_dish = []
        $dish_id = Auth::favorite()->dish_id ?? [];
        foreach ($dish_id as $id){
            $faboraite_dish[] = Dish::find($id);
        }
        return response()->json($favoraite_dish);
    }
}
