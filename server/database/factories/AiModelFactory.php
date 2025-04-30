<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AiModel>
 */
class AiModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'provider_name' => $this->faker->randomElement(['OpenAI', 'Anthropic', 'Google']),
            'model_name' => $this->faker->randomElement(['GPT-4', 'Claude 3', 'Gemini']),
            'logo_url' => $this->faker->imageUrl(),
            'votes_count' => $this->faker->numberBetween(0, 5000),
        ];
    }
}
