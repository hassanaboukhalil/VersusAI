<?php

namespace App\Services;

use App\Models\Battle;
use App\Models\BattleResponse;
use App\Models\BattleRound;
use Illuminate\Http\Request;

class BattleRoundService
{
    // main functions

    // public function createRoundAndResponses(Battle $battle, Request $request, int $round_number): array
    // {
    //     $round = BattleRound::create([
    //         'battle_id' => $battle->id,
    //         'round_number' => $round_number,
    //     ]);

    //     $battle_response_service = new BattleResponseService();

    //     if ($battle->category->name === 'Text Summarization') {
    //         $response_1 = $battle_response_service->getTextSummarizationResponse(
    //             $battle->ai_model_1->model_name,
    //             $request->description,
    //             $battle->temperature
    //         );
    //         $response_2 = $battle_response_service->getTextSummarizationResponse(
    //             $battle->ai_model_2->model_name,
    //             $request->description,
    //             $battle->temperature
    //         );

    //         $response_text_1 = is_array($response_1) ? $response_1['summary'] : $response_1;
    //         $response_text_2 = is_array($response_2) ? $response_2['summary'] : $response_2;

    //         $battleResponse1 = BattleResponse::create([
    //             'battle_round_id' => $round->id,
    //             'ai_model_id' => $battle->ai_model_1_id,
    //             'response_text' => $response_text_1,
    //             'response_time_ms' => $response_1['response_time_ms'],
    //             'prompt_tokens' => $response_1['prompt_tokens'],
    //             'completion_tokens' => $response_1['completion_tokens'],
    //         ]);

    //         $battleResponse2 = BattleResponse::create([
    //             'battle_round_id' => $round->id,
    //             'ai_model_id' => $battle->ai_model_2_id,
    //             'response_text' => $response_text_2,
    //             'response_time_ms' => $response_2['response_time_ms'],
    //             'prompt_tokens' => $response_2['prompt_tokens'],
    //             'completion_tokens' => $response_2['completion_tokens'],
    //         ]);

    //         return [
    //             'id' => $battle->id,
    //             'title' => $battle->title,
    //             'type' => $battle->category->name,
    //             'description' => $battle->description,
    //             'ai_model_1_name' => $battle->ai_model_1->model_name,
    //             'ai_model_2_name' => $battle->ai_model_2->model_name,
    //             'ai_model_1_response' => $battleResponse1->response_text,
    //             'ai_model_2_response' => $battleResponse2->response_text,
    //             'responses' => [
    //                 [
    //                     'ai_model_name' => $battle->ai_model_1->model_name,
    //                     'response_text' => $response_text_1,
    //                     'response_time_ms' => $response_1['response_time_ms'],
    //                     'prompt_tokens' => $response_1['prompt_tokens'],
    //                     'completion_tokens' => $response_1['completion_tokens'],
    //                 ],
    //                 [
    //                     'ai_model_name' => $battle->ai_model_2->model_name,
    //                     'response_text' => $response_text_2,
    //                     'response_time_ms' => $response_2['response_time_ms'],
    //                     'prompt_tokens' => $response_2['prompt_tokens'],
    //                     'completion_tokens' => $response_2['completion_tokens'],
    //                 ],
    //             ],

    //         ];
    //     }


    //     if ($battle->category->name === 'Text Translation') {
    //         $text_to_translate = $request->description;
    //         $target_language = $request->target_language;

    //         $response_1 = $battle_response_service->getTextTranslationResponse(
    //             $battle->ai_model_1->model_name,
    //             $text_to_translate,
    //             $target_language
    //         );

    //         $response_2 = $battle_response_service->getTextTranslationResponse(
    //             $battle->ai_model_2->model_name,
    //             $text_to_translate,
    //             $target_language
    //         );

    //         $response_text_1 = is_array($response_1) ? $response_1['translated'] : $response_1;
    //         $response_text_2 = is_array($response_2) ? $response_2['translated'] : $response_2;

    //         $battleResponse1 = BattleResponse::create([
    //             'battle_round_id' => $round->id,
    //             'ai_model_id' => $battle->ai_model_1_id,
    //             'response_text' => $response_text_1,
    //         ]);

    //         $battleResponse2 = BattleResponse::create([
    //             'battle_round_id' => $round->id,
    //             'ai_model_id' => $battle->ai_model_2_id,
    //             'response_text' => $response_text_2,
    //         ]);

    //         return [
    //             'id' => $battle->id,
    //             'title' => $battle->title,
    //             'type' => $battle->category->name,
    //             'description' => $battle->description,
    //             'target_language' => $target_language,
    //             'ai_model_1_name' => $battle->ai_model_1->model_name,
    //             'ai_model_2_name' => $battle->ai_model_2->model_name,
    //             'ai_model_1_response' => $battleResponse1->response_text,
    //             'ai_model_2_response' => $battleResponse2->response_text,
    //         ];
    //     }

    //     if ($battle->category->name === 'Code Generation') {
    //         $task_description = $request->description;
    //         $programming_language = $request->programming_language;

    //         $response_1 = $battle_response_service->getCodeGenerationResponse(
    //             $battle->ai_model_1->model_name,
    //             $task_description,
    //             $programming_language
    //         );

    //         $response_2 = $battle_response_service->getCodeGenerationResponse(
    //             $battle->ai_model_2->model_name,
    //             $task_description,
    //             $programming_language
    //         );

    //         $response_text_1 = is_array($response_1) ? $response_1['code'] : $response_1;
    //         $response_text_2 = is_array($response_2) ? $response_2['code'] : $response_2;

    //         $battleResponse1 = BattleResponse::create([
    //             'battle_round_id' => $round->id,
    //             'ai_model_id' => $battle->ai_model_1_id,
    //             'response_text' => $response_text_1,
    //         ]);

    //         $battleResponse2 = BattleResponse::create([
    //             'battle_round_id' => $round->id,
    //             'ai_model_id' => $battle->ai_model_2_id,
    //             'response_text' => $response_text_2,
    //         ]);

    //         return [
    //             'id' => $battle->id,
    //             'title' => $battle->title,
    //             'type' => $battle->category->name,
    //             'description' => $battle->description,
    //             'programming_language' => $programming_language,
    //             'ai_model_1_name' => $battle->ai_model_1->model_name,
    //             'ai_model_2_name' => $battle->ai_model_2->model_name,
    //             'ai_model_1_response' => $battleResponse1->response_text,
    //             'ai_model_2_response' => $battleResponse2->response_text,
    //         ];
    //     }

    //     if ($battle->category->name === 'Debate Challenge') {
    //         // Get previous responses for context if this isn't the first round
    //         $opponent_response = null;
    //         if ($round_number > 1) {
    //             $lastRound = BattleRound::where('battle_id', $battle->id)
    //                 ->where('round_number', $round_number - 1)
    //                 ->first();
    //             if ($lastRound) {
    //                 $lastResponses = $lastRound->responses()
    //                     ->with('ai_model')
    //                     ->get();
    //                 foreach ($lastResponses as $response) {
    //                     if ($response->ai_model_id === $battle->ai_model_2_id) {
    //                         $opponent_response = $response->response_text;
    //                         break;
    //                     }
    //                 }
    //             }
    //         }

    //         $response_1 = $battle_response_service->getDebateChallengeResponse(
    //             $battle->ai_model_1->model_name,
    //             $battle->debate_title_1,
    //             $battle->debate_title_2,
    //             $opponent_response
    //         );

    //         $opponent_response = null; // Reset for second AI
    //         if ($round_number > 1) {
    //             $lastRound = BattleRound::where('battle_id', $battle->id)
    //                 ->where('round_number', $round_number - 1)
    //                 ->first();
    //             if ($lastRound) {
    //                 $lastResponses = $lastRound->responses()
    //                     ->with('ai_model')
    //                     ->get();
    //                 foreach ($lastResponses as $response) {
    //                     if ($response->ai_model_id === $battle->ai_model_1_id) {
    //                         $opponent_response = $response->response_text;
    //                         break;
    //                     }
    //                 }
    //             }
    //         }

    //         $response_2 = $battle_response_service->getDebateChallengeResponse(
    //             $battle->ai_model_2->model_name,
    //             $battle->debate_title_2,
    //             $battle->debate_title_1,
    //             $opponent_response
    //         );

    //         $response_text_1 = is_array($response_1) ? $response_1['response'] : $response_1;
    //         $response_text_2 = is_array($response_2) ? $response_2['response'] : $response_2;

    //         $battleResponse1 = BattleResponse::create([
    //             'battle_round_id' => $round->id,
    //             'ai_model_id' => $battle->ai_model_1_id,
    //             'response_text' => $response_text_1,
    //         ]);

    //         $battleResponse2 = BattleResponse::create([
    //             'battle_round_id' => $round->id,
    //             'ai_model_id' => $battle->ai_model_2_id,
    //             'response_text' => $response_text_2,
    //         ]);

    //         return [
    //             'id' => $battle->id,
    //             'title' => $battle->title,
    //             'type' => $battle->category->name,
    //             'debate_title_1' => $battle->debate_title_1,
    //             'debate_title_2' => $battle->debate_title_2,
    //             'ai_model_1_name' => $battle->ai_model_1->model_name,
    //             'ai_model_2_name' => $battle->ai_model_2->model_name,
    //             'ai_model_1_response' => $battleResponse1->response_text,
    //             'ai_model_2_response' => $battleResponse2->response_text,
    //         ];
    //     }
    //     return [];
    // }




    // public function createRoundAndResponses(Battle $battle, Request $request, int $round_number): array
    // {
    //     $round = BattleRound::create([
    //         'battle_id' => $battle->id,
    //         'round_number' => $round_number,
    //     ]);

    //     $battle_response_service = new BattleResponseService();

    //     if ($battle->category->name === 'Text Summarization') {
    //         $response_1 = $battle_response_service->getTextSummarizationResponse(
    //             $battle->ai_model_1->model_name,
    //             $request->description,
    //             $battle->temperature
    //         );
    //         $response_2 = $battle_response_service->getTextSummarizationResponse(
    //             $battle->ai_model_2->model_name,
    //             $request->description,
    //             $battle->temperature
    //         );

    //         $response_text_1 = is_array($response_1) ? $response_1['summary'] : $response_1;
    //         $response_text_2 = is_array($response_2) ? $response_2['summary'] : $response_2;

    //         $battleResponse1 = BattleResponse::create([
    //             'battle_round_id' => $round->id,
    //             'ai_model_id' => $battle->ai_model_1_id,
    //             'response_text' => $response_text_1,
    //             'response_time_ms' => $response_1['response_time_ms'],
    //             'prompt_tokens' => $response_1['prompt_tokens'],
    //             'completion_tokens' => $response_1['completion_tokens'],
    //         ]);

    //         $battleResponse2 = BattleResponse::create([
    //             'battle_round_id' => $round->id,
    //             'ai_model_id' => $battle->ai_model_2_id,
    //             'response_text' => $response_text_2,
    //             'response_time_ms' => $response_2['response_time_ms'],
    //             'prompt_tokens' => $response_2['prompt_tokens'],
    //             'completion_tokens' => $response_2['completion_tokens'],
    //         ]);

    //         return [
    //             'id' => $battle->id,
    //             'title' => $battle->title,
    //             'type' => $battle->category->name,
    //             'description' => $battle->description,
    //             'ai_model_1_name' => $battle->ai_model_1->model_name,
    //             'ai_model_2_name' => $battle->ai_model_2->model_name,
    //             'ai_model_1_response' => $battleResponse1->response_text,
    //             'ai_model_2_response' => $battleResponse2->response_text,
    //             'responses' => [
    //                 [
    //                     'ai_model_name' => $battle->ai_model_1->model_name,
    //                     'response_text' => $response_text_1,
    //                     'response_time_ms' => $response_1['response_time_ms'],
    //                     'prompt_tokens' => $response_1['prompt_tokens'],
    //                     'completion_tokens' => $response_1['completion_tokens'],
    //                 ],
    //                 [
    //                     'ai_model_name' => $battle->ai_model_2->model_name,
    //                     'response_text' => $response_text_2,
    //                     'response_time_ms' => $response_2['response_time_ms'],
    //                     'prompt_tokens' => $response_2['prompt_tokens'],
    //                     'completion_tokens' => $response_2['completion_tokens'],
    //                 ],
    //             ],

    //         ];
    //     }


    //     if ($battle->category->name === 'Text Translation') {
    //         $text_to_translate = $request->description;
    //         $target_language = $request->target_language;

    //         $response_1 = $battle_response_service->getTextTranslationResponse(
    //             $battle->ai_model_1->model_name,
    //             $text_to_translate,
    //             $target_language
    //         );

    //         $response_2 = $battle_response_service->getTextTranslationResponse(
    //             $battle->ai_model_2->model_name,
    //             $text_to_translate,
    //             $target_language
    //         );

    //         $response_text_1 = is_array($response_1) ? $response_1['translated'] : $response_1;
    //         $response_text_2 = is_array($response_2) ? $response_2['translated'] : $response_2;

    //         $battleResponse1 = BattleResponse::create([
    //             'battle_round_id' => $round->id,
    //             'ai_model_id' => $battle->ai_model_1_id,
    //             'response_text' => $response_text_1,
    //             'response_time_ms' => $response_1['response_time_ms'],
    //             'prompt_tokens' => $response_1['prompt_tokens'],
    //             'completion_tokens' => $response_1['completion_tokens'],
    //         ]);

    //         $battleResponse2 = BattleResponse::create([
    //             'battle_round_id' => $round->id,
    //             'ai_model_id' => $battle->ai_model_2_id,
    //             'response_text' => $response_text_2,
    //             'response_time_ms' => $response_2['response_time_ms'],
    //             'prompt_tokens' => $response_2['prompt_tokens'],
    //             'completion_tokens' => $response_2['completion_tokens'],
    //         ]);

    //         return [
    //             'id' => $battle->id,
    //             'title' => $battle->title,
    //             'type' => $battle->category->name,
    //             'description' => $battle->description,
    //             'target_language' => $target_language,
    //             'ai_model_1_name' => $battle->ai_model_1->model_name,
    //             'ai_model_2_name' => $battle->ai_model_2->model_name,
    //             'ai_model_1_response' => $battleResponse1->response_text,
    //             'ai_model_2_response' => $battleResponse2->response_text,
    //             'responses' => [
    //                 [
    //                     'ai_model_name' => $battle->ai_model_1->model_name,
    //                     'response_text' => $response_text_1,
    //                     'response_time_ms' => $response_1['response_time_ms'],
    //                     'prompt_tokens' => $response_1['prompt_tokens'],
    //                     'completion_tokens' => $response_1['completion_tokens'],
    //                 ],
    //                 [
    //                     'ai_model_name' => $battle->ai_model_2->model_name,
    //                     'response_text' => $response_text_2,
    //                     'response_time_ms' => $response_2['response_time_ms'],
    //                     'prompt_tokens' => $response_2['prompt_tokens'],
    //                     'completion_tokens' => $response_2['completion_tokens'],
    //                 ],
    //             ],

    //         ];
    //     }

    //     if ($battle->category->name === 'Code Generation') {
    //         $task_description = $request->description;
    //         $programming_language = $request->programming_language;

    //         $response_1 = $battle_response_service->getCodeGenerationResponse(
    //             $battle->ai_model_1->model_name,
    //             $task_description,
    //             $programming_language
    //         );

    //         $response_2 = $battle_response_service->getCodeGenerationResponse(
    //             $battle->ai_model_2->model_name,
    //             $task_description,
    //             $programming_language
    //         );

    //         $response_text_1 = is_array($response_1) ? $response_1['code'] : $response_1;
    //         $response_text_2 = is_array($response_2) ? $response_2['code'] : $response_2;

    //         $battleResponse1 = BattleResponse::create([
    //             'battle_round_id' => $round->id,
    //             'ai_model_id' => $battle->ai_model_1_id,
    //             'response_text' => $response_text_1,
    //             'response_time_ms' => $response_1['response_time_ms'],
    //             'prompt_tokens' => $response_1['prompt_tokens'],
    //             'completion_tokens' => $response_1['completion_tokens'],
    //         ]);

    //         $battleResponse2 = BattleResponse::create([
    //             'battle_round_id' => $round->id,
    //             'ai_model_id' => $battle->ai_model_2_id,
    //             'response_text' => $response_text_2,
    //             'response_time_ms' => $response_2['response_time_ms'],
    //             'prompt_tokens' => $response_2['prompt_tokens'],
    //             'completion_tokens' => $response_2['completion_tokens'],
    //         ]);

    //         return [
    //             'id' => $battle->id,
    //             'title' => $battle->title,
    //             'type' => $battle->category->name,
    //             'description' => $battle->description,
    //             'programming_language' => $programming_language,
    //             'ai_model_1_name' => $battle->ai_model_1->model_name,
    //             'ai_model_2_name' => $battle->ai_model_2->model_name,
    //             'ai_model_1_response' => $battleResponse1->response_text,
    //             'ai_model_2_response' => $battleResponse2->response_text,
    //             'responses' => [
    //                 [
    //                     'ai_model_name' => $battle->ai_model_1->model_name,
    //                     'response_text' => $response_text_1,
    //                     'response_time_ms' => $response_1['response_time_ms'],
    //                     'prompt_tokens' => $response_1['prompt_tokens'],
    //                     'completion_tokens' => $response_1['completion_tokens'],
    //                 ],
    //             ],
    //         ];
    //     }

    //     if ($battle->category->name === 'Debate Challenge') {
    //         // Get previous responses for context if this isn't the first round
    //         $opponent_response = null;
    //         if ($round_number > 1) {
    //             $lastRound = BattleRound::where('battle_id', $battle->id)
    //                 ->where('round_number', $round_number - 1)
    //                 ->first();
    //             if ($lastRound) {
    //                 $lastResponses = $lastRound->responses()
    //                     ->with('ai_model')
    //                     ->get();
    //                 foreach ($lastResponses as $response) {
    //                     if ($response->ai_model_id === $battle->ai_model_2_id) {
    //                         $opponent_response = $response->response_text;
    //                         break;
    //                     }
    //                 }
    //             }
    //         }

    //         $response_1 = $battle_response_service->getDebateChallengeResponse(
    //             $battle->ai_model_1->model_name,
    //             $battle->debate_title_1,
    //             $battle->debate_title_2,
    //             $opponent_response
    //         );

    //         $opponent_response = null; // Reset for second AI
    //         if ($round_number > 1) {
    //             $lastRound = BattleRound::where('battle_id', $battle->id)
    //                 ->where('round_number', $round_number - 1)
    //                 ->first();
    //             if ($lastRound) {
    //                 $lastResponses = $lastRound->responses()
    //                     ->with('ai_model')
    //                     ->get();
    //                 foreach ($lastResponses as $response) {
    //                     if ($response->ai_model_id === $battle->ai_model_1_id) {
    //                         $opponent_response = $response->response_text;
    //                         break;
    //                     }
    //                 }
    //             }
    //         }

    //         $response_2 = $battle_response_service->getDebateChallengeResponse(
    //             $battle->ai_model_2->model_name,
    //             $battle->debate_title_2,
    //             $battle->debate_title_1,
    //             $opponent_response
    //         );

    //         $response_text_1 = is_array($response_1) ? $response_1['response'] : $response_1;
    //         $response_text_2 = is_array($response_2) ? $response_2['response'] : $response_2;

    //         $battleResponse1 = BattleResponse::create([
    //             'battle_round_id' => $round->id,
    //             'ai_model_id' => $battle->ai_model_1_id,
    //             'response_text' => $response_text_1,
    //             'response_time_ms' => $response_1['response_time_ms'],
    //             'prompt_tokens' => $response_1['prompt_tokens'],
    //             'completion_tokens' => $response_1['completion_tokens'],
    //         ]);

    //         $battleResponse2 = BattleResponse::create([
    //             'battle_round_id' => $round->id,
    //             'ai_model_id' => $battle->ai_model_2_id,
    //             'response_text' => $response_text_2,
    //             'response_time_ms' => $response_2['response_time_ms'],
    //             'prompt_tokens' => $response_2['prompt_tokens'],
    //             'completion_tokens' => $response_2['completion_tokens'],
    //         ]);

    //         return [
    //             'id' => $battle->id,
    //             'title' => $battle->title,
    //             'type' => $battle->category->name,
    //             'debate_title_1' => $battle->debate_title_1,
    //             'debate_title_2' => $battle->debate_title_2,
    //             'ai_model_1_name' => $battle->ai_model_1->model_name,
    //             'ai_model_2_name' => $battle->ai_model_2->model_name,
    //             'ai_model_1_response' => $battleResponse1->response_text,
    //             'ai_model_2_response' => $battleResponse2->response_text,
    //             'responses' => [
    //                 [
    //                     'ai_model_name' => $battle->ai_model_1->model_name,
    //                     'response_text' => $response_text_1,
    //                     'response_time_ms' => $response_1['response_time_ms'],
    //                     'prompt_tokens' => $response_1['prompt_tokens'],
    //                     'completion_tokens' => $response_1['completion_tokens'],
    //                 ],q
    //             ],
    //         ];
    //     }
    //     return [];
    // }




    public function createRoundAndResponses(Battle $battle, Request $request, int $round_number): array
    {
        $round = BattleRound::create([
            'battle_id' => $battle->id,
            'round_number' => $round_number,
        ]);

        $service = new BattleResponseService();
        $category = $battle->category->name;

        if ($category === 'Text Summarization') {
            return $this->handleTextSummarization($battle, $request, $round, $service);
        }

        if ($category === 'Text Translation') {
            return $this->handleTextTranslation($battle, $request, $round, $service);
        }

        if ($category === 'Code Generation') {
            return $this->handleCodeGeneration($battle, $request, $round, $service);
        }

        if ($category === 'Debate Challenge') {
            return $this->handleDebateChallenge($battle, $request, $round_number, $round, $service);
        }

        return [];
    }

    public function handleCreateRound(Request $request): ?array
    {
        $battle = Battle::with(['category', 'ai_model_1', 'ai_model_2', 'rounds'])
            ->findOrFail($request->battle_id);

        if (!$battle->is_active) return null;

        $lastRound = $battle->rounds->sortByDesc('round_number')->first();
        $newRoundNumber = $lastRound ? $lastRound->round_number + 1 : 1;

        return $this->createRoundAndResponses($battle, $request, $newRoundNumber);
    }

    // ===== Category Handlers =====

    private function handleTextSummarization($battle, $request, $round, $service)
    {
        $res1 = $service->getTextSummarizationResponse($battle->ai_model_1->model_name, $request->description, $battle->temperature);
        $res2 = $service->getTextSummarizationResponse($battle->ai_model_2->model_name, $request->description, $battle->temperature);

        return $this->storeResponsesAndFormat($battle, $round, $res1, $res2, 'summary');
    }

    private function handleTextTranslation($battle, $request, $round, $service)
    {
        $res1 = $service->getTextTranslationResponse($battle->ai_model_1->model_name, $request->description, $request->target_language);
        $res2 = $service->getTextTranslationResponse($battle->ai_model_2->model_name, $request->description, $request->target_language);

        return $this->storeResponsesAndFormat($battle, $round, $res1, $res2, 'translated', [
            'target_language' => $request->target_language
        ]);
    }

    private function handleCodeGeneration($battle, $request, $round, $service)
    {
        $res1 = $service->getCodeGenerationResponse($battle->ai_model_1->model_name, $request->description, $request->programming_language);
        $res2 = $service->getCodeGenerationResponse($battle->ai_model_2->model_name, $request->description, $request->programming_language);

        return $this->storeResponsesAndFormat($battle, $round, $res1, $res2, 'code', [
            'programming_language' => $request->programming_language
        ]);
    }

    private function handleDebateChallenge($battle, $request, $round_number, $round, $service)
    {
        $res1 = $service->getDebateChallengeResponse(
            $battle->ai_model_1->model_name,
            $battle->debate_title_1,
            $battle->debate_title_2,
            $this->getOpponentResponse($battle, $round_number, $battle->ai_model_2_id)
        );

        $res2 = $service->getDebateChallengeResponse(
            $battle->ai_model_2->model_name,
            $battle->debate_title_2,
            $battle->debate_title_1,
            $this->getOpponentResponse($battle, $round_number, $battle->ai_model_1_id)
        );

        return $this->storeResponsesAndFormat($battle, $round, $res1, $res2, 'response', [
            'debate_title_1' => $battle->debate_title_1,
            'debate_title_2' => $battle->debate_title_2
        ]);
    }

    // ===== Helper Functions =====

    private function storeResponsesAndFormat($battle, $round, $res1, $res2, string $key, array $extra = []): array
    {
        $text1 = is_array($res1) ? $res1[$key] : $res1;
        $text2 = is_array($res2) ? $res2[$key] : $res2;

        // Check if any AI response is null or empty
        if (empty($text1) || empty($text2)) {
            // Delete the round and battle if responses are invalid
            $round->delete();
            $battle->delete();

            throw new \Exception("One or more AI models failed to generate a valid response. Please try different AI models.");
        }

        $r1 = BattleResponse::create([
            'battle_round_id' => $round->id,
            'ai_model_id' => $battle->ai_model_1_id,
            'response_text' => $text1,
            'response_time_ms' => $res1['response_time_ms'] ?? null,
            'prompt_tokens' => $res1['prompt_tokens'] ?? null,
            'completion_tokens' => $res1['completion_tokens'] ?? null,
        ]);

        $r2 = BattleResponse::create([
            'battle_round_id' => $round->id,
            'ai_model_id' => $battle->ai_model_2_id,
            'response_text' => $text2,
            'response_time_ms' => $res2['response_time_ms'] ?? null,
            'prompt_tokens' => $res2['prompt_tokens'] ?? null,
            'completion_tokens' => $res2['completion_tokens'] ?? null,
        ]);

        return array_merge([
            'id' => $battle->id,
            'title' => $battle->title,
            'type' => $battle->category->name,
            'description' => $battle->description,
            'ai_model_1_name' => $battle->ai_model_1->model_name,
            'ai_model_2_name' => $battle->ai_model_2->model_name,
            'ai_model_1_response' => $r1->response_text,
            'ai_model_2_response' => $r2->response_text,
            'responses' => [
                [
                    'ai_model_name' => $battle->ai_model_1->model_name,
                    'response_text' => $r1->response_text,
                    'response_time_ms' => $r1->response_time_ms,
                    'prompt_tokens' => $r1->prompt_tokens,
                    'completion_tokens' => $r1->completion_tokens,
                ],
                [
                    'ai_model_name' => $battle->ai_model_2->model_name,
                    'response_text' => $r2->response_text,
                    'response_time_ms' => $r2->response_time_ms,
                    'prompt_tokens' => $r2->prompt_tokens,
                    'completion_tokens' => $r2->completion_tokens,
                ],
            ],
        ], $extra);
    }

    private function getOpponentResponse(Battle $battle, int $round_number, int $opponent_id): ?string
    {
        return BattleRound::where('battle_id', $battle->id)
            ->where('round_number', $round_number - 1)
            ->first()
            ?->responses()
            ->where('ai_model_id', $opponent_id)
            ->value('response_text');
    }
}
