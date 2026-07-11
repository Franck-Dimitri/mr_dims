<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'image',
        'markdown_content',
        'meta_description',
        'views_count',
        'likes_count',
        'status',
        'author',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    public function comments()
    {
        return $this->hasMany(BlogComment::class);
    }
}
