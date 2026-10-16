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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt')->nullable();
            $table->text('description_markdown')->nullable();
            $table->json('tech_stack')->nullable();
            $table->string('repository_url')->nullable();
            $table->string('live_url')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });

        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('markdown_content')->nullable();
            $table->text('meta_description')->nullable();
            $table->integer('views_count')->default(0);
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->text('message');
            $table->enum('platform_origin', ['web', 'whatsapp'])->default('web');
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });

        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->string('client_name');
            $table->string('client_email');
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending');
            $table->string('meeting_link')->nullable();
            $table->timestamps();
        });

        Schema::create('analytics_page_views', function (Blueprint $table) {
            $table->id();
            $table->string('page_url');
            $table->string('visitor_hash');
            $table->string('user_agent')->nullable();
            $table->timestamps();
        });

        Schema::create('system_logs', function (Blueprint $table) {
            $table->id();
            $table->string('level');
            $table->text('message');
            $table->json('context')->nullable();
            $table->boolean('is_resolved')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('system_logs');
        Schema::dropIfExists('analytics_page_views');
        Schema::dropIfExists('appointments');
        Schema::dropIfExists('contacts');
        Schema::dropIfExists('blogs');
        Schema::dropIfExists('projects');
    }
};
