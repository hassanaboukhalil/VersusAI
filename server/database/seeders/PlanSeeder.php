<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Plan::insert([
            [
                'name' => 'Free',
                'price' => 0.00
            ],
            [
                'name' => 'Pro',
                'price' => 9.99
            ],
        ]);
    }
}
