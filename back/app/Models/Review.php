<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Review extends Model
{
    protected $fillable = [
        'user_id',
        'dish_id',
        'post_id',
        'category',
        'score',
    ];

    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reviewScores(): HasMany
    {
        return $this->hasMany(ReviewScore::class);
    }

    public function reviewTags(): HasMany
    {
        return $this->hasMany(ReviewTag::class);
    }
}
