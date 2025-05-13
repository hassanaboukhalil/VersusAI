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
            "Summarize a given text clearly and concisely",
            [
                "summary" => "A clear, concise summary of the input text in 3 to 4 lines max.",
            ]
        );

        $prompt = "Summarize the following text in a short, clear paragraph (no more than 3–4 lines):\n\n"
            . $text_to_summarize;

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

        $prompt = "Translate the following text to {$target_language}. Important: Give me ONLY the direct translation as plain text. Do not include:\n" .
            "- No triple backticks (```) or single backticks (`)\n" .
            "- No markdown formatting (no *, **, _, __, #, ##, etc.)\n" .
            "- No bullet points or numbered lists\n" .
            "- No quotation marks unless they are part of the original text\n\n" .
            "Here's the text to translate:\n{$text}";

        if ($this->isOpenRouterModel($ai_model_name)) {
            $response = $this->callOpenRouterChat($prompt, $ai_model_name);
            // Remove any potential formatting characters
            $cleanResponse = preg_replace('/[`*_#>-]/', '', $response);
            return [
                'original' => $text,
                'translated' => $cleanResponse,
                'language' => $target_language
            ];
        }

        $provider = $this->getProviderForModel($ai_model_name);

        $response = Prism::structured()
            ->using($provider, $ai_model_name)
            ->withSchema($schema)
            ->withPrompt($prompt)
            ->asStructured();

        return $response->structured;
    }

    public function getCodeGenerationResponse(string $ai_model_name, string $task_description, string $programming_language): array
    {
        $schema = BattleResponseSchema::createPrismSchema(
            "code_generation",
            "Generate code in a specific language based on a task description",
            [
                "language" => "The programming language used",
                "task" => "The description of the task",
                "code" => "The generated code solution",
            ]
        );

        $prompt = "Write code in {$programming_language} to accomplish the following task:\n\n{$task_description}\n\n" .
            "Important: Provide ONLY the code solution without any additional explanations or markdown formatting.";

        if ($this->isOpenRouterModel($ai_model_name)) {
            $response = $this->callOpenRouterChat($prompt, $ai_model_name);
            // Remove any potential code block markers
            $cleanResponse = trim($response, '`');
            return [
                'language' => $programming_language,
                'task' => $task_description,
                'code' => $cleanResponse
            ];
        }

        $provider = $this->getProviderForModel($ai_model_name);

        $response = Prism::structured()
            ->using($provider, $ai_model_name)
            ->withSchema($schema)
            ->withPrompt($prompt)
            ->asStructured();

        return $response->structured;
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
            $response = $this->callOpenRouterChat($prompt, $ai_model_name);
            return [
                'response' => $response
            ];
        }

        $provider = $this->getProviderForModel($ai_model_name);

        $response = Prism::structured()
            ->using($provider, $ai_model_name)
            ->withSchema($schema)
            ->withPrompt($prompt)
            ->asStructured();

        return $response->structured;
    }


    private function isOpenRouterModel(string $model): bool
    {
        return str_starts_with($model, 'deepseek') ||
            str_starts_with($model, 'meta-llama') ||
            str_starts_with($model, 'mixtral') ||
            $model === 'Groq';
    }

    private function getProviderForModel(string $model): Provider
    {
        return match (true) {
            str_starts_with($model, 'gpt-') || str_contains($model, 'chatgpt') || str_contains($model, 'o3-') => Provider::OpenAI,
            str_starts_with($model, 'gemini') => Provider::Gemini,
            $this->isOpenRouterModel($model) => throw new \InvalidArgumentException("Model should be handled by OpenRouter before reaching provider selection"),
            default => throw new \InvalidArgumentException("Unsupported AI model: $model")
        };
    }
}
