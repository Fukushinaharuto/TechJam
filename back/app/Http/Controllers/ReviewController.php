<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tag;
use App\Models\Review;
use App\Models\Post;
use App\Models\PostTag;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ReviewController extends Controller
{

    public function select()
    {
        $reviews = Tag::select('id', 'name')->get();
        return response()->json([
            'reviews' => $reviews
        ]);
    }

    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
            $validated = $request->all();
            Log::debug($validated);
            $imageFile = $request->file('imageFile');
            if ($imageFile) {
                if ($user->image_url) {
                    $deletePath = 'public/' . $user->image_url;
                    Storage::delete($deletePath);
                }
                $path = $imageFile->store('posts', 'public');
                $fileName = basename($path);
            }
            $user = Auth::user();
            // Post作成
            $post = Post::create([
                'user_id'     => $user->id,
                'image_url' => $validated['image_url'],
                'dish_id'     => $validated['dish_id'],
                'event_id'    => null,
                'name'        => $validated['name'],
                'description' => $validated['description'],
                'image_url' => $fileName,
                'like_count'  => $validated['like_count'],
            ]);

            // Review作成
            
            
            // review_scoresテーブルに複数登録
            if (!empty($validated['review_scores'])) {
                foreach ($validated['review_scores'] as $scoreData) {
                    $review = Review::create([
                        'post_id'  => $post->id,
                        'category' => $scoreData['category'], // review_scoresに全部入れるのでここは不要かも
                        'score'    => $scoreData['score'],
                    ]);
                }
            }
            
            // タグ複数登録 (post_tagsテーブルへ)
            if (!empty($validated['tag_ids'])) {
                foreach ($validated['tag_ids'] as $tagId) {
                    PostTag::create([
                        'post_id' => $post->id,
                        'tag_id'  => $tagId,
                    ]);
                }
            }

            DB::commit();

            return response()->json(['success' => true], 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to create review', 'error' => $e->getMessage()], 500);
        }
    }
}
