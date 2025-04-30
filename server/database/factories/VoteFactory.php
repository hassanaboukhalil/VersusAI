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
            'user_id' => User::factory(),
            'battle_id' => Battle::factory(),
            'voted_ai_model_id' => AiModel::factory(),
        ];
    }
}
