<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'level',
        'message',
        'context',
        'is_resolved',
    ];

    protected $casts = [
        'context' => 'array',
        'is_resolved' => 'boolean',
    ];
}
