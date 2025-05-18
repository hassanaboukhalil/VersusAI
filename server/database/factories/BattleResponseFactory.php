<?php

namespace Database\Factories;

use App\Models\AiModel;
use App\Models\BattleRound;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BattleResponse>
 */
class BattleResponseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'battle_round_id' => BattleRound::inRandomOrder()->first()->id,
            'ai_model_id' => AiModel::inRandomOrder()->first()->id,
            'response_text' => $this->faker->paragraph(3),
            'response_time_ms' => $this->faker->numberBetween(100, 1000),
            'prompt_tokens' => $this->faker->numberBetween(100, 1000),
            'completion_tokens' => $this->faker->numberBetween(100, 1000),
        ];
    }
}
