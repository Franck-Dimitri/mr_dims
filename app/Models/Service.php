<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'title', 'slug', 'ref_id', 'excerpt', 'description_markdown', 'tech_stack', 'base_price', 'is_active'
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'tech_stack' => 'array',
            'base_price' => 'decimal:2',
        ];
    }
}
