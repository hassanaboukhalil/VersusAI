<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserTypeSeeder::class,
            PlanSeeder::class,
            CategorySeeder::class,
            AiModelSeeder::class,
            UserSeeder::class,
            FollowerSeeder::class,
            BattleSeeder::class,
            BattleRoundSeeder::class,
            BattleResponseSeeder::class,
            VoteSeeder::class,
            BookmarkSeeder::class,
            PaymentSeeder::class,
            NotificationSeeder::class,
            CommentSeeder::class,
        ]);
    }
}
