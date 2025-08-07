<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\ReviewScore;
use App\Models\ReviewTag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReviewController extends Controller
{
    /**
     * Store a newly created review in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'dish_id' => 'required|exists:dishes,id',
            'post_id' => 'nullable|exists:posts,id',
            'category' => 'required|string',
            'score' => 'required|integer|min:1|max:5',
            'review_scores' => 'nullable|array',
            'review_scores.*.name' => 'required_with:review_scores|string',
            'review_scores.*.score' => 'required_with:review_scores|integer',
            'review_tags' => 'nullable|array',
            'review_tags.*.name' => 'required_with:review_tags|string',
            'review_tags.*.type' => 'required_with:review_tags|string',
        ]);

        DB::beginTransaction();

        try {
            $review = Review::create([
                'user_id' => $validated['user_id'],
                'dish_id' => $validated['dish_id'],
                'post_id' => $validated['post_id'] ?? null,
                'category' => $validated['category'],
                'score' => $validated['score'],
            ]);

            if (!empty($validated['review_scores'])) {
                foreach ($validated['review_scores'] as $scoreData) {
                    $review->reviewScores()->create($scoreData);
                }
            }

            if (!empty($validated['review_tags'])) {
                foreach ($validated['review_tags'] as $tagData) {
                    $review->reviewTags()->create($tagData);
                }
            }

            DB::commit();

            return response()->json(['message' => 'Review created successfully', 'review' => $review], 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to create review', 'error' => $e->getMessage()], 500);
        }
    }
}
