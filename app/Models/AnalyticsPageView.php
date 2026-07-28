<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnalyticsPageView extends Model
{
    protected $fillable = [
        'page_url',
        'visitor_hash',
        'ip_address',
        'country',
        'user_agent',
    ];
}
