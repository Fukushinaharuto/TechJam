<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function dish()
    {
        return $this->belongsTo(Dish::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'post_tags');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
