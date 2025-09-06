<?php

namespace Database\Factories;

use App\Models\Assignment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AssignmentSubmission>
 */
class AssignmentSubmissionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $score = fake()->randomFloat(2, 0, 100);
        $gradePercentage = fake()->randomFloat(2, 60, 100);
        $status = fake()->randomElement(['submitted', 'graded']);
        
        return [
            'assignment_id' => Assignment::factory(),
            'student_id' => User::factory()->student(),
            'answers' => $this->generateAnswers(),
            'score' => $status === 'graded' ? $score : null,
            'grade_percentage' => $status === 'graded' ? $gradePercentage : null,
            'status' => $status,
            'feedback' => $status === 'graded' ? fake()->paragraph() : null,
            'attempt_number' => fake()->numberBetween(1, 3),
            'submitted_at' => fake()->dateTimeBetween('-1 month', 'now'),
            'graded_at' => $status === 'graded' ? fake()->dateTimeBetween('-1 week', 'now') : null,
        ];
    }

    /**
     * Generate sample answers.
     */
    protected function generateAnswers(): array
    {
        return [
            'question_1' => fake()->randomElement(['A', 'B', 'C', 'D']),
            'question_2' => fake()->paragraph(3),
        ];
    }

    /**
     * Indicate that the submission is graded.
     */
    public function graded(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'graded',
            'score' => fake()->randomFloat(2, 70, 100),
            'grade_percentage' => fake()->randomFloat(2, 70, 100),
            'feedback' => fake()->paragraph(),
            'graded_at' => fake()->dateTimeBetween('-1 week', 'now'),
        ]);
    }

    /**
     * Indicate that the submission is pending grading.
     */
    public function pendingGrading(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'submitted',
            'score' => null,
            'grade_percentage' => null,
            'feedback' => null,
            'graded_at' => null,
        ]);
    }
}