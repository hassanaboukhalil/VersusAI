<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Category;
use App\Models\AiModel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Battle>
 */
class BattleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $ai_Ids = AiModel::inRandomOrder()->limit(2)->pluck('id');
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'category_id' => Category::inRandomOrder()->first()->id,
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            // 'ai_model_1_id' => AiModel::inRandomOrder()->first()->id,
            // 'ai_model_2_id' => AiModel::inRandomOrder()->first()->id,
            'ai_model_1_id' => $ai_Ids[0],
            'ai_model_2_id' => $ai_Ids[1],
            'is_active' => $this->faker->boolean(50),
        ];
    }
}
