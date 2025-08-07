<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReviewTag extends Model
{
    protected $fillable = [
        'review_id',
        'name',
        'type',
    ];

    public function review()
    {
        return $this->belongsTo(Review::class);
    }
}
