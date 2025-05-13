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


        if ($battle->category->name === 'Text Translation') {
            $text_to_translate = $request->description;
            $target_language = $request->target_language;

            $response_1 = $battle_response_service->getTextTranslationResponse(
                $battle->ai_model_1->model_name,
                $text_to_translate,
                $target_language
            );

            $response_2 = $battle_response_service->getTextTranslationResponse(
                $battle->ai_model_2->model_name,
                $text_to_translate,
                $target_language
            );

            $response_text_1 = is_array($response_1) ? $response_1['translated'] : $response_1;
            $response_text_2 = is_array($response_2) ? $response_2['translated'] : $response_2;

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
                'target_language' => $target_language,
                'ai_model_1_name' => $battle->ai_model_1->model_name,
                'ai_model_2_name' => $battle->ai_model_2->model_name,
                'ai_model_1_response' => $battleResponse1->response_text,
                'ai_model_2_response' => $battleResponse2->response_text,
            ];
        }

        if ($battle->category->name === 'Code Generation') {
            $task_description = $request->description;
            $programming_language = $request->programming_language;

            $response_1 = $battle_response_service->getCodeGenerationResponse(
                $battle->ai_model_1->model_name,
                $task_description,
                $programming_language
            );

            $response_2 = $battle_response_service->getCodeGenerationResponse(
                $battle->ai_model_2->model_name,
                $task_description,
                $programming_language
            );

            $response_text_1 = is_array($response_1) ? $response_1['code'] : $response_1;
            $response_text_2 = is_array($response_2) ? $response_2['code'] : $response_2;

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
                'programming_language' => $programming_language,
                'ai_model_1_name' => $battle->ai_model_1->model_name,
                'ai_model_2_name' => $battle->ai_model_2->model_name,
                'ai_model_1_response' => $battleResponse1->response_text,
                'ai_model_2_response' => $battleResponse2->response_text,
            ];
        }
        return [];
    }

    public function handleCreateRound(Request $request): array|null
    {
        $battle = Battle::with(['category', 'ai_model_1', 'ai_model_2', 'rounds'])
            ->findOrFail($request->battle_id);

        if (!$battle->is_active) {
            return null; // Battle is ended
        }

        $lastRound = $battle->rounds->sortByDesc('round_number')->first();
        $newRoundNumber = $lastRound ? $lastRound->round_number + 1 : 1;

        return $this->createRoundAndResponses($battle, $request, $newRoundNumber);
    }
}
