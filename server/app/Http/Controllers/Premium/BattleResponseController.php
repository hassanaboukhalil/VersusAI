<?php

namespace App\Http\Controllers\Premium;

use App\Http\Controllers\Controller;
use App\Services\BattleResponseService;
use App\Services\BattleService;
use Illuminate\Http\Request;
use App\Models\Battle;
use App\Models\BattleResponse;
use App\Models\BattleRound;
use Illuminate\Http\JsonResponse;

class BattleResponseController extends Controller
{
    private BattleResponseService $battleResponseService;

    public function __construct(BattleResponseService $battleResponseService)
    {
        $this->battleResponseService = $battleResponseService;
    }

    public function getBattleResponse()
    {
        try {
            // $ai_model_name = 'gpt-4o';
            $ai_model_name = 'gemini-2.0-flash';
            // $ai_model_name = 'deepseek-prover-v2';
            // $ai_model_name = 'claude-3-haiku-20240307';
            // $ai_model_name = 'meta-llama/llama-4-scout-17b-16e-instruct';
            // $ai_model_name = 'Groq';


            $battle_type = 'Debate Challenge';
            $battle_response_service = new BattleResponseService();

            if ($battle_type === 'Text Summarization') {
                $text_to_summarize = 'Creating an LLM-powered mobile app begins by carefully selecting a strong and reliable open-source model like LLaMA, Mistral, or Gemma to fit the projects needs. Instead of building a model from scratch, using an existing base model saves significant time and resources while ensuring high-quality performance. To enable communication between the app and the model, a backend using FastAPI or Laravel is built, with the LLM being served through a system like Hugging Face Inference or Ollama. A custom AI agent is then developed on top of the model to manage conversation flow, add personality, and ensure a smooth, human-like interaction. Through the mobile app, users can chat directly with the AI in real time, creating a seamless experience similar to what ChatGPT provides, but fully customized to the projects vision.';
                $data = $battle_response_service->getTextSummarizationResponse($ai_model_name, $text_to_summarize);
            }

            if ($battle_type === 'Text Translation') {
                $text_to_translate = 'Creating an LLM-powered mobile app begins by carefully selecting a strong and reliable open-source model like LLaMA, Mistral, or Gemma to fit the projects needs. Instead of building a model from scratch, using an existing base model saves significant time and resources while ensuring high-quality performance. To enable communication between the app and the model, a backend using FastAPI or Laravel is built, with the LLM being served through a system like Hugging Face Inference or Ollama. A custom AI agent is then developed on top of the model to manage conversation flow, add personality, and ensure a smooth, human-like interaction. Through the mobile app, users can chat directly with the AI in real time, creating a seamless experience similar to what ChatGPT provides, but fully customized to the projects vision.';
                $target_language = 'French';
                $data = $battle_response_service->getTextTranslationResponse($ai_model_name, $text_to_translate, $target_language);
            }

            if ($battle_type === "Code Generation") {
                $task_description = 'Build a REST API endpoint that returns a list of users as JSON.';
                $language = 'PHP';
                $data = $battle_response_service->getCodeGenerationResponse($ai_model_name, $task_description, $language);
            }

            if ($battle_type === "Debate Challenge") {


                $debate_topic_with = 'Summer';
                $debate_topic_against = 'Winter';
                $opponent_response = null;
                $data = $battle_response_service->getDebateChallengeResponse($ai_model_name, $debate_topic_with, $debate_topic_against, $opponent_response);
            }

            if ($data) {
                return $this->successResponse($data, 'You got the battle response successfully');
            }

            return $this->errorResponse('Something went wrong', 500);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function getTextSummarization(Request $request): JsonResponse
    {
        // try {
        //     $result = $this->battleResponseService->getTextSummarizationResponse(
        //         $request->ai_model_name,
        //         $request->text_to_summarize
        //     );

        //     return response()->json([
        //         'success' => true,
        //         'data' => $result
        //     ]);
        // } catch (\Exception $e) {
        //     return response()->json([
        //         'success' => false,
        //         'message' => 'Failed to get text summarization',
        //         'error' => $e->getMessage()
        //     ], 500);
        // }


        $request->validate([
            'ai_model_name'     => 'required|string',
            'text_to_summarize' => 'required|string',
        ]);

        // 3) Call service
        $result = $this->battleResponseService
            ->getTextSummarizationResponse(
                $request->ai_model_name,
                $request->text_to_summarize
            );


        // // 5) Persist the actual summary
        // $battleResponse = BattleResponse::create([
        //     // 'battle_round_id' => $round->id,
        //     // 'ai_model_id'     => $battle->ai_model_1_id,   // or whatever you choose
        //     'response_text'   => $result['summary'],
        //     // optionally store tokens on the response too
        //     'prompt_tokens'     => $result['prompt_tokens'],
        //     'completion_tokens' => $result['completion_tokens'],
        // ]);

        return response()->json([
            'success' => true,
            'data'    => [
                // 'round'    => $round,
                'response' => $result,
            ],
        ]);
    }

    public function createDebateResponse(Request $request): JsonResponse
    {
        $request->validate([
            'battle_id' => 'required|exists:battles,id',
            'debate_title_1' => 'required|string',
            'debate_title_2' => 'required|string',
            'is_first_response' => 'required|boolean',
            'opponent_response' => 'nullable|string',
            'round_id' => 'nullable|exists:battle_rounds,id',
        ]);

        try {
            $battle = Battle::with(['ai_model_1', 'ai_model_2'])->findOrFail($request->battle_id);

            $result = $this->battleResponseService->createDebateResponse(
                $battle,
                $request->is_first_response,
                $request->opponent_response,
                $request->round_id
            );

            return response()->json([
                'success' => true,
                'data' => $result
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create debate response',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
