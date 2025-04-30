<?php

namespace Database\Seeders;

use App\Models\AiModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class AiModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        AiModel::insert([
            [
                'provider_name' => 'OpenAI',
                'model_name' => 'GPT-4',
                'logo_url' => $faker->imageUrl(),
                'votes_count' => $faker->numberBetween(0, 5000),
            ],
            [
                'provider_name' => 'Anthropic',
                'model_name' => 'Claude 3',
                'logo_url' => $faker->imageUrl(),
                'votes_count' => $faker->numberBetween(0, 5000),
            ],
            [
                'provider_name' => 'Google',
                'model_name' => 'Gemini',
                'logo_url' => $faker->imageUrl(),
                'votes_count' => $faker->numberBetween(0, 5000),
            ],
        ]);
    }
}
