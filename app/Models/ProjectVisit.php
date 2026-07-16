<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectVisit extends Model
{
    protected $guarded = [];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
