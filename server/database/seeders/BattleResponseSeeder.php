<?php

namespace Database\Seeders;

use App\Models\BattleResponse;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class BattleResponseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // For every BattleRound, generate 2 BattleResponse records
        \App\Models\BattleRound::all()->each(function ($round) {
            $faker = Faker::create();

            // This uses the relationship $round->battle (defined in the model) to get the parent Battle of the round
            // I made that to be able to use ai_model_1_id and ai_model_2_id
            $battle = $round->battle;

            // Safety check to avoid null reference error
            if (!$battle) {
                return; // skip this round
            }

            BattleResponse::factory()->create([
                'battle_round_id' => $round->id,
                'ai_model_id' => $battle->ai_model_1_id,
                'response_time_ms' => $faker->randomFloat(2, 100, 1000),
                'prompt_tokens' => $faker->numberBetween(100, 1000),
                'completion_tokens' => $faker->numberBetween(100, 1000),
            ]);

            BattleResponse::factory()->create([
                'battle_round_id' => $round->id,
                'ai_model_id' => $battle->ai_model_2_id,
                'response_time_ms' => $faker->randomFloat(2, 100, 1000),
                'prompt_tokens' => $faker->numberBetween(100, 1000),
                'completion_tokens' => $faker->numberBetween(100, 1000),
            ]);
        });
    }
}
