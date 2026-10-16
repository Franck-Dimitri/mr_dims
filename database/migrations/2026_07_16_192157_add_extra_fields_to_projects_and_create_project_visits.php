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
        Schema::table('projects', function (Blueprint $table) {
            $table->string('status')->default('completed')->after('is_featured'); // 'in_progress' or 'completed'
            $table->date('start_date')->nullable()->after('status');
            $table->date('end_date')->nullable()->after('start_date');
            $table->date('planned_deployment_date')->nullable()->after('end_date');
            $table->json('key_features')->nullable()->after('planned_deployment_date');
            $table->integer('likes_count')->default(0)->after('key_features');
        });

        Schema::create('project_visits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->string('ip_address');
            $table->string('country')->nullable();
            $table->text('user_agent')->nullable();
            $table->integer('likes_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_visits');

        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn([
                'status',
                'start_date',
                'end_date',
                'planned_deployment_date',
                'key_features',
                'likes_count'
            ]);
        });
    }
};
