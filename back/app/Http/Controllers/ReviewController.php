<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Dish_image;
use App\Models\Review;
use App\Models\Dish;

class ReviewController extends Controller
{
    public function index($id)
    {
        $posts = Post::where('dish_id', $id)->with('review')->get();
        $name = Dish::find($id)->name ?? null;
        $images = Dish_image::where('dish_id', $id)->pluck('image_url');
        $score = [];
        foreach ($posts as $post) {
            $review = $post->review;
            if ($review) {
                $score[] = [
                    'name' => $review->name,
                    'score' => $review->score,
                ];
            }
        }

        
        return response()->json(
            [
            'name' => $name,
            'image_url' => $images,
            "name_score" => $score
            ]);
    }
}
