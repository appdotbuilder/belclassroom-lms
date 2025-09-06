<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Assignment>
 */
class AssignmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'course_id' => Course::factory(),
            'teacher_id' => User::factory()->teacher(),
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(3),
            'type' => fake()->randomElement(['multiple_choice', 'essay', 'mixed']),
            'questions' => $this->generateQuestions(),
            'max_points' => fake()->numberBetween(50, 200),
            'time_limit_minutes' => fake()->randomElement([30, 60, 90, 120, null]),
            'due_date' => fake()->dateTimeBetween('+1 week', '+2 months'),
            'is_published' => fake()->boolean(70),
            'allow_multiple_attempts' => fake()->boolean(30),
            'max_attempts' => fake()->numberBetween(1, 3),
        ];
    }

    /**
     * Generate sample questions based on assignment type.
     */
    protected function generateQuestions(): array
    {
        return [
            [
                'id' => 1,
                'type' => 'multiple_choice',
                'question' => fake()->sentence() . '?',
                'options' => [
                    'A' => fake()->word(),
                    'B' => fake()->word(),
                    'C' => fake()->word(),
                    'D' => fake()->word(),
                ],
                'correct_answer' => fake()->randomElement(['A', 'B', 'C', 'D']),
                'points' => fake()->numberBetween(5, 15),
            ],
            [
                'id' => 2,
                'type' => 'essay',
                'question' => fake()->sentence() . '?',
                'max_words' => fake()->numberBetween(200, 500),
                'points' => fake()->numberBetween(20, 50),
            ],
        ];
    }

    /**
     * Indicate that the assignment is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_published' => true,
        ]);
    }

    /**
     * Indicate that the assignment allows multiple attempts.
     */
    public function multipleAttempts(): static
    {
        return $this->state(fn (array $attributes) => [
            'allow_multiple_attempts' => true,
            'max_attempts' => fake()->numberBetween(2, 5),
        ]);
    }
}