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
            'battle_round_id' => BattleRound::factory(),
            'ai_model_id' => AiModel::factory(),
            'response_text' => $this->faker->paragraph(3),
        ];
    }
}
