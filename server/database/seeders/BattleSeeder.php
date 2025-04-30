<?php

namespace Database\Seeders;

use App\Models\Battle;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BattleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Battle::factory()->count(5)->create();
    }
}
