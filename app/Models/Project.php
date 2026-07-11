<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'is_featured' => 'boolean',
            'tech_stack' => 'array',
            'images' => 'array',
        ];
    }
}
