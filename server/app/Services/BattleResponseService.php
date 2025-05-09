<?php

namespace App\Services;

use App\Schemas\BattleResponseSchema;
use Illuminate\Support\Facades\Http;
use Prism\Prism\Enums\Provider;
use Prism\Prism\Prism;
use App\Traits\HandlesAiModelCalls;


class BattleResponseService
{
    use HandlesAiModelCalls;

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

        // if ($ai_model_name === 'deepseek-prover-v2') {
        //     return $response = $this->callOpenRouterDeepSeek($prompt, $ai_model_name);
        // }

        if ($this->isOpenRouterModel($ai_model_name)) {
            return $this->callOpenRouterChat($prompt, $ai_model_name);
        }


        $provider = $this->getProviderForModel($ai_model_name);

        $response = Prism::structured()
            ->using($provider, $ai_model_name)
            ->withSchema($schema)
            ->withPrompt($prompt)
            ->asStructured();


        return $response;
    }


    public function getDebateChallengeResponse(
        string $ai_model_name,
        string $debate_topic_with,
        string $debate_topic_against,
        ?string $opponent_response = null
    ): array {
        // 1. Build a Prism-compatible schema
        $schema = BattleResponseSchema::createPrismSchema(
            "debate_challenge",
            "Structured response for an AI vs AI debate",
            [
                "response" => "Respond to the debate in a single unified paragraph.",
            ]
        );

        // 2. Create the prompt
        $prompt = "You are participating in a competitive AI debate.\n\n"
            . "You must argue **FOR**: \"$debate_topic_with\"\n"
            . "You must argue **AGAINST**: \"$debate_topic_against\"\n\n";

        if ($opponent_response) {
            $prompt .= "Your opponent previously said:\n\"$opponent_response\"\n\n"
                . "Respond in a short, persuasive **single paragraph** (no more than 4 lines). Stay focused and concise.";
        } else {
            $prompt .= "Present your opening statement as a short, impactful **single paragraph** (no more than 4 lines). Be persuasive and focused.";
        }

        // 3. Handle via OpenRouter or Prism
        if ($this->isOpenRouterModel($ai_model_name)) {
            return $this->callOpenRouterChat($prompt, $ai_model_name);
        }

        $provider = $this->getProviderForModel($ai_model_name);

        $response = Prism::structured()
            ->using($provider, $ai_model_name)
            ->withSchema($schema)
            ->withPrompt($prompt)
            ->asStructured();

        return $response->structured;
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
