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
        Schema::create('assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->enum('type', ['multiple_choice', 'essay', 'image_matching', 'voice_test', 'mixed']);
            $table->json('questions')->nullable();
            $table->integer('max_points')->default(100);
            $table->integer('time_limit_minutes')->nullable();
            $table->timestamp('due_date');
            $table->boolean('is_published')->default(false);
            $table->boolean('allow_multiple_attempts')->default(false);
            $table->integer('max_attempts')->default(1);
            $table->timestamps();
            
            // Add indexes for performance
            $table->index('course_id');
            $table->index('teacher_id');
            $table->index('type');
            $table->index('is_published');
            $table->index('due_date');
            $table->index(['course_id', 'is_published']);
            $table->index(['course_id', 'due_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assignments');
    }
};