<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CvAnalytic extends Model
{
    use HasFactory;

    protected $table = 'cv_analytics';

    protected $fillable = [
        'event_type',
        'ip_address',
        'country',
        'user_agent',
    ];
}
