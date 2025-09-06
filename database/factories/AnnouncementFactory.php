<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Announcement>
 */
class AnnouncementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'author_id' => User::factory()->teacher(),
            'course_id' => fake()->boolean(70) ? Course::factory() : null,
            'title' => fake()->sentence(6),
            'content' => fake()->paragraphs(3, true),
            'priority' => fake()->randomElement(['low', 'normal', 'high']),
            'is_published' => fake()->boolean(80),
            'published_at' => fake()->dateTimeBetween('-1 month', 'now'),
            'expires_at' => fake()->boolean(30) ? fake()->dateTimeBetween('+1 week', '+3 months') : null,
        ];
    }

    /**
     * Indicate that the announcement is high priority.
     */
    public function highPriority(): static
    {
        return $this->state(fn (array $attributes) => [
            'priority' => fake()->randomElement(['high', 'urgent']),
        ]);
    }

    /**
     * Indicate that the announcement is global (not course-specific).
     */
    public function global(): static
    {
        return $this->state(fn (array $attributes) => [
            'course_id' => null,
            'author_id' => User::factory()->administrator(),
        ]);
    }

    /**
     * Indicate that the announcement is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_published' => true,
            'published_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ]);
    }
}