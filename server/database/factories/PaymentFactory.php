<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Plan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
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
            'plan_id' => Plan::factory(),
            'amount' => $this->faker->randomFloat(10),
            'payment_status' => $this->faker->randomElement(['success', 'pending', 'failed']),
            'transaction_id' => $this->faker->uuid(),
            'paid_at' => now(),
        ];
    }
}
