<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LearningMaterial>
 */
class LearningMaterialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['text', 'pdf', 'video', 'presentation']);
        
        return [
            'course_id' => Course::factory(),
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(2),
            'type' => $type,
            'content' => $type === 'text' ? fake()->paragraphs(5, true) : null,
            'file_path' => in_array($type, ['pdf', 'presentation']) ? fake()->filePath() : null,
            'video_url' => $type === 'video' ? fake()->url() : null,
            'order_index' => fake()->numberBetween(1, 20),
            'is_mandatory' => fake()->boolean(80),
        ];
    }

    /**
     * Indicate that the material is a text-based lesson.
     */
    public function textLesson(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'text',
            'content' => fake()->paragraphs(8, true),
            'file_path' => null,
            'video_url' => null,
        ]);
    }

    /**
     * Indicate that the material is a video lesson.
     */
    public function videoLesson(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'video',
            'content' => null,
            'file_path' => null,
            'video_url' => fake()->url(),
        ]);
    }
}