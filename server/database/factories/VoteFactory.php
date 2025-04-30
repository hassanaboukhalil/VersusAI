<?php

namespace Database\Factories;

use App\Models\AiModel;
use App\Models\Battle;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vote>
 */
class VoteFactory extends Factory
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
            'battle_id' => Battle::inRandomOrder()->first()->id,
            'ai_model_id' => AiModel::inRandomOrder()->first()->id,
        ];
    }
}
