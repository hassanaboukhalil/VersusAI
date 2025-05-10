<?php

namespace App\Services;

use App\Models\AiModel;
use App\Models\Battle;
use App\Models\BattleResponse;
use App\Models\BattleRound;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BattleService
{
    public function getAllBattles(): array
    {
        $all_battles = Battle::where('is_active', false)->with('user', 'category', 'ai_model_1', 'ai_model_2', 'votes')->get();

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
                'type' => $battle->category->name,
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

    public function createBattle(Request $request): array
    {
        $user = Auth::user();
        $battle_type_name = $request->battle_type_name;
        $ai_model_1_name = $request->ai_model_1_name;
        $ai_model_2_name = $request->ai_model_2_name;


        $battle_type_id = Category::where("name", $battle_type_name)->first()->id;


        $ai_model_1_id = AiModel::where("model_name", $request->ai_model_1_name)->first()->id;
        $ai_model_2_id = AiModel::where("model_name", $request->ai_model_2_name)->first()->id;


        $battle = Battle::create([
            'user_id' => $user->id,
            'category_id' => $battle_type_id,
            'ai_model_1_id' => $ai_model_1_id,
            'ai_model_2_id' => $ai_model_2_id,
            'title' => $request->title,
            'description' => $request->description
        ]);

        if ($battle) {
            $battle_round = BattleRound::create([
                'battle_id' => $battle->id,
                'round_number' => 1,
            ]);

            if ($battle_round) {
                if ($battle_type_name == 'Text Summarization') {
                    $battle_response_service = new BattleResponseService();

                    $response_1 = $battle_response_service->getTextSummarizationResponse($ai_model_1_name, $request->description);
                    $response_2 = $battle_response_service->getTextSummarizationResponse($ai_model_2_name, $request->description);

                    // If result is an array from Prism, get ['summary'], otherwise it's already a string (OpenRouter)
                    $response_text_1 = is_array($response_1) ? $response_1['summary'] : $response_1;
                    $response_text_2 = is_array($response_2) ? $response_2['summary'] : $response_2;

                    $battleResponse1 = BattleResponse::create([
                        'battle_round_id' => $battle_round->id,
                        'ai_model_id' => $ai_model_1_id,
                        'response_text' => $response_text_1
                    ]);

                    $battleResponse2 = BattleResponse::create([
                        'battle_round_id' => $battle_round->id,
                        'ai_model_id' => $ai_model_2_id,
                        'response_text' => $response_text_2
                    ]);



                    return [
                        'id' => $battle->id,
                        'title' => $battle->title,
                        'type' => $battle->category->name,
                        'description' => $request->description,
                        'ai_model_1_name' => $battle->ai_model_1->model_name,
                        'ai_model_2_name' => $battle->ai_model_2->model_name,
                        'ai_model_1_response' => $battleResponse1->response_text,
                        'ai_model_2_response' => $battleResponse2->response_text,
                    ];
                }
            }
        };


        return $battle;
    }
}
