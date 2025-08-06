<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
<<<<<<< HEAD
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

=======

class DishController extends Controller
{
    //
}
>>>>>>> b8c8121dd4d4ccb7eee7c9a64484978b4908abeb
