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
            'user_id' => User::inRandomOrder()->first()->id,
            // 'plan_id' => Plan::inRandomOrder()->first()->id,
            'plan_name' => 'Premium',
            'amount' => $this->faker->randomFloat(2, 9.99, 9.99),
            'payment_status' => $this->faker->randomElement(['success', 'pending', 'failed']),
            'transaction_id' => $this->faker->uuid(),
            'paid_at' => now(),
        ];
    }
}
