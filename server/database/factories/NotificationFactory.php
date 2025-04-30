<?php

namespace Database\Factories;

use App\Models\Battle;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'notifier_id' => User::factory(),
            'target_id' => Battle::factory(),
            'type' => $this->faker->randomElement(['new_follower', 'vote_cast']),
            'message' => $this->faker->sentence(6),
            'is_read' => $this->faker->boolean(30),
        ];
    }
}
