<?php

namespace App\Http\Controllers;

use App\Services\BattleService;
use Illuminate\Http\Request;

class BattleController extends Controller
{
    public function getAllBattles()
    {
        $battle_service = new BattleService();

        $battles = $battle_service->getAllBattles();

        return $this->successResponse(
            $battles,
            'Battles retrieved successfully.'
        );
    }

    public function create(Request $request)
    {
        $battle_service = new BattleService();

        /*
        {
            $title = 'Text Summarization Battle Between Two AIs',
            $description = 'Creating an LLM-powered mobile app begins by carefully selecting a strong and reliable open-source model like LLaMA, Mistral, or Gemma to fit the projects needs. Instead of building a model from scratch, using an existing base model saves significant time and resources while ensuring high-quality performance. To enable communication between the app and the model, a backend using FastAPI or Laravel is built, with the LLM being served through a system like Hugging Face Inference or Ollama. A custom AI agent is then developed on top of the model to manage conversation flow, add personality, and ensure a smooth, human-like interaction. Through the mobile app, users can chat directly with the AI in real time, creating a seamless experience similar to what ChatGPT provides, but fully customized to the projects vision.
            $battle_type_name = 'Text Summarization',
            $ai_model_1_name = 'gemini-2.0-flash',
            $ai_model_2_name = 'deepseek-prover-v2',

        }

        */
        $battle = $battle_service->createBattle($request);

        if ($battle) {
            return $this->successResponse(
                [
                    'id' => $battle['id']
                ],
                'Battle created successfully.'
            );
        }

        return $this->errorResponse('Something went wrong, try again', 500);
    }

    public function get(int $id)
    {
        $battle_service = new BattleService();
        $battle = $battle_service->getBattle($id);

        if ($battle) {
            return $this->successResponse($battle);
        }

        return $this->errorResponse('Something went wrong, try again', 500);
    }

    public function end($id)
    {
        $battle_service = new BattleService();
        $result = $battle_service->endBattle($id);

        if ($result) {
            return $this->successResponse(['id' => $id, 'is_active' => false], 'Battle has been ended.');
        }

        return $this->errorResponse('Battle is already ended or does not exist.', 400);
    }
}
