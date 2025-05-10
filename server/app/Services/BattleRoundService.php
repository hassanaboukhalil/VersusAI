<?php

namespace App\Services;

use App\Models\Battle;
use App\Models\BattleResponse;
use App\Models\BattleRound;
use Illuminate\Http\Request;

class BattleRoundService
{
    public function createRoundAndResponses(Battle $battle, Request $request, int $round_number): array
    {
        $round = BattleRound::create([
            'battle_id' => $battle->id,
            'round_number' => $round_number,
        ]);

        $battle_response_service = new BattleResponseService();

        if ($battle->category->name === 'Text Summarization') {
            $response_1 = $battle_response_service->getTextSummarizationResponse(
                $battle->ai_model_1->model_name,
                $request->description
            );
            $response_2 = $battle_response_service->getTextSummarizationResponse(
                $battle->ai_model_2->model_name,
                $request->description
            );

            $response_text_1 = is_array($response_1) ? $response_1['summary'] : $response_1;
            $response_text_2 = is_array($response_2) ? $response_2['summary'] : $response_2;

            $battleResponse1 = BattleResponse::create([
                'battle_round_id' => $round->id,
                'ai_model_id' => $battle->ai_model_1_id,
                'response_text' => $response_text_1,
            ]);

            $battleResponse2 = BattleResponse::create([
                'battle_round_id' => $round->id,
                'ai_model_id' => $battle->ai_model_2_id,
                'response_text' => $response_text_2,
            ]);

            return [
                'id' => $battle->id,
                'title' => $battle->title,
                'type' => $battle->category->name,
                'description' => $battle->description,
                'ai_model_1_name' => $battle->ai_model_1->model_name,
                'ai_model_2_name' => $battle->ai_model_2->model_name,
                'ai_model_1_response' => $battleResponse1->response_text,
                'ai_model_2_response' => $battleResponse2->response_text,
            ];
        }

        return [];
    }
}
