<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrivateProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'token',
        'category',
        'price',
        'original_price',
        'ad_spend',
        'access_type',
        'access_url',
        'file_path',
        'tagline',
        'description_markdown',
        'cover_image',
        'images',
        'preview_video_url',
        'access_details',
        'features',
        'curriculum',
        'badge_text',
        'is_active',
        'is_featured',
        'sales_count',
        'views_count',
    ];

    protected $casts = [
        'price' => 'float',
        'original_price' => 'float',
        'ad_spend' => 'float',
        'features' => 'array',
        'curriculum' => 'array',
        'images' => 'array',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'sales_count' => 'integer',
        'views_count' => 'integer',
    ];

    public function orders()
    {
        return $this->hasMany(PrivateOrder::class);
    }
}
