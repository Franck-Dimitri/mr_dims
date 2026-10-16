<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('private_orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_hash')->unique();
            $table->foreignId('private_product_id')->constrained('private_products')->onDelete('cascade');
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone');
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->decimal('amount', 10, 2);
            $table->string('currency')->default('FCFA');
            $table->string('payment_method')->default('orange_money');
            $table->string('payment_status')->default('pending');
            $table->string('transaction_reference')->nullable();
            $table->text('notes')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('private_orders');
    }
};
