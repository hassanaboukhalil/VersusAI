<?php

namespace Database\Seeders;

use App\Models\Battle;
use App\Models\BattleRound;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BattleRoundSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // For every battle in the database, create between 2 and 4 battle rounds.
        Battle::all()->each(function ($battle) {
            BattleRound::factory()->count(rand(2, 4))->create(['battle_id' => $battle->id]);
        });
    }
}
