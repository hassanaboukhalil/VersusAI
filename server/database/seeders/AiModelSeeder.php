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
                'model_name' => 'gpt-4o',
                'logo_url' => $faker->imageUrl(),
                'votes_count' => $faker->numberBetween(0, 5000),
            ],
            [
                'provider_name' => 'OpenAI',
                'model_name' => 'gpt-4.1',
                'logo_url' => $faker->imageUrl(),
                'votes_count' => $faker->numberBetween(0, 5000),
            ],
            [
                'provider_name' => 'OpenAI',
                'model_name' => 'o3-mini',
                'logo_url' => $faker->imageUrl(),
                'votes_count' => $faker->numberBetween(0, 5000),
            ],
            [
                'provider_name' => 'OpenAI',
                'model_name' => 'chatgpt-4o',
                'logo_url' => $faker->imageUrl(),
                'votes_count' => $faker->numberBetween(0, 5000),
            ],
            [
                'provider_name' => 'DeepSeek',
                'model_name' => 'deepseek-prover-v2',
                'logo_url' => $faker->imageUrl(),
                'votes_count' => $faker->numberBetween(0, 5000),
            ],
            [
                'provider_name' => 'Google',
                'model_name' => 'gemini-2.0-flash',
                'logo_url' => $faker->imageUrl(),
                'votes_count' => $faker->numberBetween(0, 5000),
            ],
        ]);
    }
}
