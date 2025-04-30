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
        return [
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'ai_a_model_id' => AiModel::factory(),
            'ai_b_model_id' => AiModel::factory(),
            'is_active' => $this->faker->boolean(80),
        ];
    }
}
