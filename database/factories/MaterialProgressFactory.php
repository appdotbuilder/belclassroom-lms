<?php

namespace Database\Factories;

use App\Models\LearningMaterial;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MaterialProgress>
 */
class MaterialProgressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $completionPercentage = fake()->numberBetween(0, 100);
        $isCompleted = $completionPercentage === 100;
        
        return [
            'student_id' => User::factory()->student(),
            'learning_material_id' => LearningMaterial::factory(),
            'completion_percentage' => $completionPercentage,
            'is_completed' => $isCompleted,
            'time_spent_seconds' => fake()->numberBetween(300, 7200),
            'started_at' => fake()->dateTimeBetween('-1 month', 'now'),
            'completed_at' => $isCompleted ? fake()->dateTimeBetween('-1 month', 'now') : null,
        ];
    }

    /**
     * Indicate that the progress is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'completion_percentage' => 100,
            'is_completed' => true,
            'completed_at' => fake()->dateTimeBetween('-1 week', 'now'),
        ]);
    }

    /**
     * Indicate that the progress is in progress.
     */
    public function inProgress(): static
    {
        return $this->state(fn (array $attributes) => [
            'completion_percentage' => fake()->numberBetween(10, 95),
            'is_completed' => false,
            'completed_at' => null,
        ]);
    }
}