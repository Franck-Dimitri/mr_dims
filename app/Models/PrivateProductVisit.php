<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrivateProductVisit extends Model
{
    use HasFactory;

    protected $fillable = [
        'private_product_id',
        'ip_address',
        'country_code',
        'country_name',
        'user_agent',
    ];

    public function product()
    {
        return $this->belongsTo(PrivateProduct::class, 'private_product_id');
    }
}
