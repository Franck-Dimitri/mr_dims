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
            'key_features' => 'array',
        ];
    }

    public function images()
    {
        return $this->hasMany(ProjectImage::class);
    }

    public function visits()
    {
        return $this->hasMany(ProjectVisit::class);
    }
}
