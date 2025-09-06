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
        Schema::create('material_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('learning_material_id')->constrained()->onDelete('cascade');
            $table->integer('completion_percentage')->default(0);
            $table->boolean('is_completed')->default(false);
            $table->integer('time_spent_seconds')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
            
            // Ensure a student can only have one progress record per material
            $table->unique(['student_id', 'learning_material_id']);
            
            // Add indexes for performance
            $table->index('student_id');
            $table->index('learning_material_id');
            $table->index('completion_percentage');
            $table->index('is_completed');
            $table->index(['student_id', 'is_completed']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('material_progress');
    }
};