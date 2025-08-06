<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Dish_image;
use App\Models\Review;

class ReviewController extends Controller
{
    public function index($id)
    {
        $posts = Post::where('dish_id', $id)->get();
        $name = $posts->name;
        $images = Dish_image::where('dish_id', $id)->get()->pluck('image_url');
        $score = [];

        foreach ($posts as $post) {
            $reviews = Review::where('post_id', $post->id)->get();
            array_push($score, [$reviews->name, $reviews->score])
        }
        return response()->json(
            'name' => $name,
            'image_url' => $images,
            "name_score" => $score
        )
    }
}
