<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'post_id',
        'category',
        'score',
    ];
    public function post()
    {
        return $this->belongsTo(Post::class, 'posts_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
