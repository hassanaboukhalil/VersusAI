<?php

namespace App\Services;

use App\Models\Battle;

class BattleService
{
    public function getAllBattles(): array
    {
        $all_battles = Battle::with('user', 'category', 'ai_model_1', 'ai_model_2', 'votes')->get();

        $battles = [];

        foreach ($all_battles as $battle) {
            $votes_ai_model_1 = 0;
            $votes_ai_model_2 = 0;

            foreach ($battle->votes as $vote) {
                if ($vote->ai_model_id === $battle->ai_model_1_id) {
                    $votes_ai_model_1++;
                } else {
                    $votes_ai_model_2++;
                }
            }

            $battles[] = [
                'id' => $battle->id,
                'title' => $battle->title,
                'ai_model_1_id' => $battle->ai_model_1_id,
                'ai_model_2_id' => $battle->ai_model_2_id,
                'ai_model_1_name' => $battle->ai_model_1->model_name,
                'ai_model_2_name' => $battle->ai_model_2->model_name,
                'votes_ai_model_1' => $votes_ai_model_1,
                'votes_ai_model_2' => $votes_ai_model_2,
                'user_first_name' => $battle->user->first_name,
                'user_last_name' => $battle->user->last_name,
                'user_profile_pic_url' => $battle->user->profile_picture_url,
                'created_at' => $battle->created_at->format('j/n/Y'),
            ];
        }

        return $battles;
    }
}
