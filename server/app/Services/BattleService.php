<?php

namespace App\Services;

use App\Models\Battle;
use App\Schemas\BattleResponseSchema;
use Prism\Prism\Enums\Provider;
use Prism\Prism\Prism;

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


    public function getBattleResponse() // $ai_model_name, $battle_type
    {
        $schema = BattleResponseSchema::createPrismSchema(
            "Text Summarization",
            "Summarize a text",
            [
                "name" => "This name of the task",
                "description" => "Summarize the text",
            ]
        );

        $response = Prism::structured()
            ->using(Provider::OpenAI, 'gpt-4o')
            ->withSchema($schema)
            ->withPrompt('Creating an LLM-powered mobile app begins by carefully selecting a strong and reliable open-source model like LLaMA, Mistral, or Gemma to fit the projects needs. Instead of building a model from scratch, using an existing base model saves significant time and resources while ensuring high-quality performance. To enable communication between the app and the model, a backend using FastAPI or Laravel is built, with the LLM being served through a system like Hugging Face Inference or Ollama. A custom AI agent is then developed on top of the model to manage conversation flow, add personality, and ensure a smooth, human-like interaction. Through the mobile app, users can chat directly with the AI in real time, creating a seamless experience similar to what ChatGPT provides, but fully customized to the projects vision.')
            ->asStructured();

        return $response->structured;
    }
}
