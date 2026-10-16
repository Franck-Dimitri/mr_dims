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
        Schema::table('blogs', function (Blueprint $table) {
            if (!Schema::hasColumn('blogs', 'image')) {
                $table->string('image')->nullable()->after('slug');
            }
            if (!Schema::hasColumn('blogs', 'likes_count')) {
                $table->integer('likes_count')->default(0)->after('views_count');
            }
            if (!Schema::hasColumn('blogs', 'author')) {
                $table->string('author')->default('Mr Dims')->after('status');
            }
        });

        Schema::create('blog_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('blog_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('email');
            $table->text('content');
            $table->boolean('is_approved')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_comments');
        
        Schema::table('blogs', function (Blueprint $table) {
            $table->dropColumn(['image', 'likes_count', 'author']);
        });
    }
};
