<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReviewScore extends Model
{
    protected $fillable = [
        'review_id',
        'name',
        'score',
    ];

    public function review()
    {
        return $this->belongsTo(Review::class);
    }
}
