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
        Schema::create('cv_analytics', function (Blueprint $table) {
            $table->id();
            $table->string('event_type'); // 'view_modal', 'download_pdf', 'view_image'
            $table->string('ip_address')->nullable();
            $table->string('country')->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cv_analytics');
    }
};
