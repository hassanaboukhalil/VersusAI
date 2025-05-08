<?php

namespace App\Http\Controllers\Premium;

use App\Http\Controllers\Controller;
use App\Services\BattleResponseService;
use App\Services\BattleService;
use Illuminate\Http\Request;

class BattleResponseController extends Controller
{
    public function getBattleResponse()
    {
        try {
            // $ai_model_name = 'gpt-4o';
            $ai_model_name = 'gemini-2.0-flash';
            $battle_type = 'Text Translation';
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

            if ($data) {
                return $this->successResponse($data, 'You got the battle response successfully');
            }

            return $this->errorResponse('Something went wrong', 500);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}
