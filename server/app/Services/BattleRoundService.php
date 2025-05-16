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
                $request->description,
                $battle->temperature
            );
            $response_2 = $battle_response_service->getTextSummarizationResponse(
                $battle->ai_model_2->model_name,
                $request->description,
                $battle->temperature
            );

            $response_text_1 = is_array($response_1) ? $response_1['summary'] : $response_1;
            $response_text_2 = is_array($response_2) ? $response_2['summary'] : $response_2;

            $battleResponse1 = BattleResponse::create([
                'battle_round_id' => $round->id,
                'ai_model_id' => $battle->ai_model_1_id,
                'response_text' => $response_text_1,
                'response_time_ms' => $response_1['response_time_ms'],
                'prompt_tokens' => $response_1['prompt_tokens'],
                'completion_tokens' => $response_1['completion_tokens'],
            ]);

            $battleResponse2 = BattleResponse::create([
                'battle_round_id' => $round->id,
                'ai_model_id' => $battle->ai_model_2_id,
                'response_text' => $response_text_2,
                'response_time_ms' => $response_2['response_time_ms'],
                'prompt_tokens' => $response_2['prompt_tokens'],
                'completion_tokens' => $response_2['completion_tokens'],
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
                'response_time_ms_1' => $response_1['response_time_ms'],
                'prompt_tokens_1' => $response_1['prompt_tokens'],
                'completion_tokens_1' => $response_1['completion_tokens'],
                'response_time_ms_2' => $response_2['response_time_ms'],
                'prompt_tokens_2' => $response_2['prompt_tokens'],
                'completion_tokens_2' => $response_2['completion_tokens'],
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

        if ($battle->category->name === 'Debate Challenge') {
            // Get previous responses for context if this isn't the first round
            $opponent_response = null;
            if ($round_number > 1) {
                $lastRound = BattleRound::where('battle_id', $battle->id)
                    ->where('round_number', $round_number - 1)
                    ->first();
                if ($lastRound) {
                    $lastResponses = $lastRound->responses()
                        ->with('ai_model')
                        ->get();
                    foreach ($lastResponses as $response) {
                        if ($response->ai_model_id === $battle->ai_model_2_id) {
                            $opponent_response = $response->response_text;
                            break;
                        }
                    }
                }
            }

            $response_1 = $battle_response_service->getDebateChallengeResponse(
                $battle->ai_model_1->model_name,
                $battle->debate_title_1,
                $battle->debate_title_2,
                $opponent_response
            );

            $opponent_response = null; // Reset for second AI
            if ($round_number > 1) {
                $lastRound = BattleRound::where('battle_id', $battle->id)
                    ->where('round_number', $round_number - 1)
                    ->first();
                if ($lastRound) {
                    $lastResponses = $lastRound->responses()
                        ->with('ai_model')
                        ->get();
                    foreach ($lastResponses as $response) {
                        if ($response->ai_model_id === $battle->ai_model_1_id) {
                            $opponent_response = $response->response_text;
                            break;
                        }
                    }
                }
            }

            $response_2 = $battle_response_service->getDebateChallengeResponse(
                $battle->ai_model_2->model_name,
                $battle->debate_title_2,
                $battle->debate_title_1,
                $opponent_response
            );

            $response_text_1 = is_array($response_1) ? $response_1['response'] : $response_1;
            $response_text_2 = is_array($response_2) ? $response_2['response'] : $response_2;

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
                'debate_title_1' => $battle->debate_title_1,
                'debate_title_2' => $battle->debate_title_2,
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
