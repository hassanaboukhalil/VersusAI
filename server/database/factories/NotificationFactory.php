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
        $user = User::inRandomOrder()->first();
        $notifier = User::where('id', '!=', $user->id)->inRandomOrder()->first();
        return [
            'user_id'     => $user->id,
            'notifier_id' => $notifier->id,
            'target_id'   => Battle::inRandomOrder()->first()?->id, // nullable in case battles aren't seeded yet
            'type'        => $this->faker->randomElement(['new_follower', 'vote_cast']),
            'message'     => $this->faker->sentence(6),
            'is_read'     => $this->faker->boolean(30),
        ];
    }
}
