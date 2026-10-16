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
        Schema::create('private_products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('token')->unique();
            $table->string('category')->default('formation_video');
            $table->decimal('price', 10, 2);
            $table->decimal('original_price', 10, 2)->nullable();
            $table->decimal('ad_spend', 10, 2)->default(0.00);
            $table->enum('access_type', ['drive', 'direct_download'])->default('drive');
            $table->text('access_url')->nullable();
            $table->string('tagline');
            $table->longText('description_markdown')->nullable();
            $table->string('cover_image')->nullable();
            $table->string('preview_video_url')->nullable();
            $table->longText('access_details')->nullable();
            $table->json('features')->nullable();
            $table->json('curriculum')->nullable();
            $table->string('badge_text')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->unsignedInteger('sales_count')->default(0);
            $table->unsignedInteger('views_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('private_products');
    }
};
