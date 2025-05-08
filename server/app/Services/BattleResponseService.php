<?php

namespace App\Services;

use App\Schemas\BattleResponseSchema;
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

    public function getCodeGenerationResponse(string $ai_model_name, string $task_description, string $language): array {}



    private function getProviderForModel(string $model): Provider
    {
        return match (true) {
            str_starts_with($model, 'gpt-') || str_contains($model, 'chatgpt') || str_contains($model, 'o3-') => Provider::OpenAI,
            str_starts_with($model, 'gemini') => Provider::Gemini,
            default => throw new \InvalidArgumentException("Unsupported AI model: $model")
        };
    }
}
