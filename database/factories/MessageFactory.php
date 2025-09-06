<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sender_id' => User::factory(),
            'recipient_id' => User::factory(),
            'subject' => fake()->sentence(6),
            'content' => fake()->paragraphs(3, true),
            'is_read' => fake()->boolean(60),
            'read_at' => fake()->boolean(60) ? fake()->dateTimeBetween('-1 week', 'now') : null,
        ];
    }

    /**
     * Indicate that the message is unread.
     */
    public function unread(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_read' => false,
            'read_at' => null,
        ]);
    }

    /**
     * Indicate that the message is from a teacher to a student.
     */
    public function teacherToStudent(): static
    {
        return $this->state(fn (array $attributes) => [
            'sender_id' => User::factory()->teacher(),
            'recipient_id' => User::factory()->student(),
        ]);
    }

    /**
     * Indicate that the message is from a student to a teacher.
     */
    public function studentToTeacher(): static
    {
        return $this->state(fn (array $attributes) => [
            'sender_id' => User::factory()->student(),
            'recipient_id' => User::factory()->teacher(),
        ]);
    }
}