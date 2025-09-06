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
        Schema::create('learning_materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->enum('type', ['text', 'pdf', 'video', 'audio', 'presentation']);
            $table->longText('content')->nullable();
            $table->string('file_path')->nullable();
            $table->string('video_url')->nullable();
            $table->integer('order_index')->default(0);
            $table->boolean('is_mandatory')->default(true);
            $table->foreignId('prerequisite_id')->nullable()->constrained('learning_materials')->onDelete('set null');
            $table->timestamps();
            
            // Add indexes for performance
            $table->index('course_id');
            $table->index('type');
            $table->index('order_index');
            $table->index('is_mandatory');
            $table->index('prerequisite_id');
            $table->index(['course_id', 'order_index']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('learning_materials');
    }
};