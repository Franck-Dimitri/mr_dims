<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrivateOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_hash',
        'private_product_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'country',
        'city',
        'amount',
        'currency',
        'payment_method',
        'payment_status',
        'transaction_reference',
        'notes',
        'paid_at',
    ];

    protected $casts = [
        'amount' => 'float',
        'paid_at' => 'datetime',
    ];

    public function product()
    {
        return $this->belongsTo(PrivateProduct::class, 'private_product_id');
    }
}
