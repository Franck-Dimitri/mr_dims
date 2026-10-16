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
        Schema::create('private_product_visits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('private_product_id')->nullable()->constrained('private_products')->onDelete('cascade');
            $table->string('ip_address', 45);
            $table->string('country_code', 10)->default('XX');
            $table->string('country_name', 100)->default('Unknown');
            $table->text('user_agent')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('private_product_visits');
    }
};
