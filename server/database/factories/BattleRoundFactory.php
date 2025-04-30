<?php

namespace Database\Factories;

use App\Models\Battle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BattleRound>
 */
class BattleRoundFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'battle_id' => Battle::inRandomOrder()->first()->id,
            'round_number' => $this->faker->numberBetween(1, 5),
        ];
    }
}
