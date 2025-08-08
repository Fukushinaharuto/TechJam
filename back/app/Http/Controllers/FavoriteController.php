<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;

class FavoriteController extends Controller
{
    public function removeFavorite($id, Request $request)
    {
        $user = $request->user();

        $deleted = Favorite::where('user_id', $user->id)
            ->where('dish_id', $id)
            ->delete();

        if ($deleted) {
            return response()->noContent(204);
        } else {
            return response()->json(['error' => 'Favorite not found'], 404);
        }
    }
}
