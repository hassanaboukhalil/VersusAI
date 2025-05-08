<?php

namespace App\Services;

use App\Schemas\BattleResponseSchema;
use Illuminate\Support\Facades\Http;
use Prism\Prism\Enums\Provider;
use Prism\Prism\Prism;


class BattleResponseService
{
    public function getTextSummarizationResponse($ai_model_name, $text_to_summarize) // $ai_model_name, $battle_type
    {
        $schema = BattleResponseSchema::createPrismSchema(
            "text_summarization",
            "Summarize a text",
            [
                "name" => "Text Summarization",
                "description" => "Summarize the text",
            ]
        );

        $provider = $this->getProviderForModel($ai_model_name);

        $response = Prism::structured()
            ->using($provider, $ai_model_name)
            ->withSchema($schema)
            ->withPrompt($text_to_summarize)
            ->asStructured();

        return $response->structured;
    }


    public function getTextTranslationResponse(string $ai_model_name, string $text, string $target_language): array
    {
        $schema = BattleResponseSchema::createPrismSchema(
            "text_translation",
            "Translate a given text to another language",
            [
                "original" => "The original input text",
                "translated" => "The translated version of the text",
                "language" => "Target language",
            ]
        );

        $provider = $this->getProviderForModel($ai_model_name);

        $prompt = "Translate the following text to {$target_language}:\n\n{$text}";

        $response = Prism::structured()
            ->using($provider, $ai_model_name)
            ->withSchema($schema)
            ->withPrompt($prompt)
            ->asStructured();

        return $response->structured;
    }

    public function getCodeGenerationResponse(string $ai_model_name, string $task_description, string $language)
    {
        $schema = BattleResponseSchema::createPrismSchema(
            "code_generation",
            "Generate code in a specific language based on a task description",
            [
                "language" => "The programming language used",
                "task" => "The description of the task",
                "code" => "The generated code",
            ]
        );

        $prompt = "Write a {$language} program to do the following:\n\n{$task_description}";

        // if (str_starts_with($ai_model_name, 'meta-llama') || str_starts_with($ai_model_name, 'mixtral') || $ai_model_name == "Groq") {
        //     return $response = $this->callGroqChat($prompt, "deepseek-r1-distill-llama-70b");
        // }

        if ($ai_model_name === 'deepseek-prover-v2') {
            return $response = $this->callOpenRouterDeepSeek($prompt, $ai_model_name);
        }

        $provider = $this->getProviderForModel($ai_model_name);

        $response = Prism::structured()
            ->using($provider, $ai_model_name)
            ->withSchema($schema)
            ->withPrompt($prompt)
            ->asStructured();


        return $response;
    }

    public function callGroqChat(string $prompt, string $model = 'meta-llama/llama-4-scout-17b-16e-instruct'): string
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('GROQ_API_KEY'),
            'Content-Type'  => 'application/json',
        ])->post('https://api.groq.com/openai/v1/chat/completions', [
            'model'    => $model,
            'messages' => [
                [
                    'role'    => 'user',
                    'content' => $prompt,
                ],
            ],
        ]);

        if ($response->failed()) {
            throw new \Exception('Groq API call failed: ' . $response->body());
        }

        return $response->json('choices.0.message.content');
    }

    private function getProviderForModel(string $model): Provider
    {
        return match (true) {
            str_starts_with($model, 'gpt-') || str_contains($model, 'chatgpt') || str_contains($model, 'o3-') => Provider::OpenAI,
            str_starts_with($model, 'gemini') => Provider::Gemini,
            // str_starts_with($model, 'deepseek') => Provider::DeepSeek,
            // str_starts_with($model, 'claude') => Provider::Anthropic,
            default => throw new \InvalidArgumentException("Unsupported AI model: $model")
        };
    }
}
