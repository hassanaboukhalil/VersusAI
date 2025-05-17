<?php

namespace App\Services;

use App\Models\Battle;
use App\Models\BattleResponse;
use App\Models\BattleRound;
use App\Schemas\BattleResponseSchema;
use App\Traits\HandlesAiModelCalls;
use App\Traits\PromptBuilderTrait;
use Illuminate\Support\Facades\Http;
use Prism\Prism\Enums\Provider;
use Prism\Prism\Prism;

class BattleResponseService
{
    use HandlesAiModelCalls, PromptBuilderTrait;

    public function createDebateResponse(
        Battle $battle,
        bool $isFirstResponse,
        ?string $opponentResponse = null,
        ?int $roundId = null
    ): array {
        if ($isFirstResponse) {
            // Create new round for first response
            $lastRound = $battle->rounds()->orderBy('round_number', 'desc')->first();
            $newRoundNumber = $lastRound ? $lastRound->round_number + 1 : 1;

            $round = BattleRound::create([
                'battle_id' => $battle->id,
                'round_number' => $newRoundNumber,
            ]);

            $response = $this->getDebateChallengeResponse(
                $battle->ai_model_1->model_name,
                $battle->debate_title_1,
                $battle->debate_title_2,
                $opponentResponse
            );

            $battleResponse = BattleResponse::create([
                'battle_round_id' => $round->id,
                'ai_model_id' => $battle->ai_model_1_id,
                'response_text' => $response['response'],
            ]);

            return [
                'id' => $round->id,
                'ai_model_name' => $battle->ai_model_1->model_name,
                'response_text' => $battleResponse->response_text,
            ];
        } else {
            // Add second response to existing round
            $round = BattleRound::findOrFail($roundId);

            $response = $this->getDebateChallengeResponse(
                $battle->ai_model_2->model_name,
                $battle->debate_title_2,
                $battle->debate_title_1,
                $opponentResponse
            );

            $battleResponse = BattleResponse::create([
                'battle_round_id' => $round->id,
                'ai_model_id' => $battle->ai_model_2_id,
                'response_text' => $response['response'],
            ]);

            return [
                'ai_model_name' => $battle->ai_model_2->model_name,
                'response_text' => $battleResponse->response_text,
            ];
        }
    }

    public function getTextSummarizationResponse(string $ai_model_name, string $text_to_summarize, float $temperature = 0.2): array
    {
        $prompt = $this->buildSummarizationPrompt($text_to_summarize);

        // If this model should go to OpenRouter…
        if ($this->isOpenRouterModel($ai_model_name)) {
            $data = $this->callOpenRouterChat($prompt, $ai_model_name, $temperature);
            return [
                'summary' => $data['result'],
                'response_time_ms' => $data['response_time_ms'],
                'prompt_tokens' => $data['prompt_tokens'],
                'completion_tokens' => $data['completion_tokens'],
            ];
        }

        $schema = BattleResponseSchema::createPrismSchema(
            "text_summarization",
            "Summarize a given text clearly and concisely",
            [
                "summary" => "A clear, concise summary of the input text in 3 to 4 lines max.",
            ]
        );

        $provider = $this->getProviderForModel($ai_model_name);

        // start timer
        $start = microtime(true);

        $response = Prism::structured()
            ->using($provider, $ai_model_name)
            ->withSchema($schema)
            ->withPrompt($prompt)
            ->usingTemperature($temperature)
            ->asStructured();

        $end = microtime(true);

        // 4) extract the structured payload
        $summary = $response->structured['summary'] ?? null;

        // extract usage
        $usage = $response->usage;
        $promptTokens     = $usage->promptTokens     ?? null;
        $completionTokens = $usage->completionTokens ?? null;

        return [
            'summary'           => $summary,
            'response_time_ms'  => (int)(($end - $start) * 1000),
            'prompt_tokens'     => $promptTokens,
            'completion_tokens' => $completionTokens,
        ];
    }

    public function getTextTranslationResponse(string $ai_model_name, string $text, string $target_language, float $temperature = 0.2): array
    {
        $prompt = $this->buildTranslationPrompt($text, $target_language);

        if ($this->isOpenRouterModel($ai_model_name)) {
            $data = $this->callOpenRouterChat($prompt, $ai_model_name, $temperature);

            return [
                'original'          => $text,
                'translated'        => $data['result'],
                'language'          => $target_language,
                'response_time_ms'  => $data['response_time_ms'],
                'prompt_tokens'     => $data['prompt_tokens'],
                'completion_tokens' => $data['completion_tokens'],
            ];
        }

        $schema = BattleResponseSchema::createPrismSchema(
            "text_translation",
            "Translate a given text to another language",
            [
                "original"   => "The original input text",
                "translated" => "The translated version of the text",
                "language"   => "Target language",
            ]
        );

        $provider = $this->getProviderForModel($ai_model_name);

        $start = microtime(true);

        $response = Prism::structured()
            ->using($provider, $ai_model_name)
            ->withSchema($schema)
            ->withPrompt($prompt)
            ->usingTemperature($temperature)
            ->asStructured();

        $end = microtime(true);

        $structured = $response->structured;

        return [
            'original'          => $structured['original'] ?? $text,
            'translated'        => $structured['translated'] ?? null,
            'language'          => $structured['language'] ?? $target_language,
            'response_time_ms'  => (int)(($end - $start) * 1000),
            'prompt_tokens'     => $response->usage->promptTokens ?? null,
            'completion_tokens' => $response->usage->completionTokens ?? null,
        ];
    }

    public function getCodeGenerationResponse(string $ai_model_name, string $task_description, string $programming_language, float $temperature = 0.2): array
    {
        $prompt = $this->buildCodeGenerationPrompt($task_description, $programming_language);

        if ($this->isOpenRouterModel($ai_model_name)) {
            $data = $this->callOpenRouterChat($prompt, $ai_model_name, $temperature);

            $cleanCode = trim($data['result'], '`'); // Clean up possible markdown-style code blocks

            return [
                'language'          => $programming_language,
                'task'              => $task_description,
                'code'              => $cleanCode,
                'response_time_ms'  => $data['response_time_ms'],
                'prompt_tokens'     => $data['prompt_tokens'],
                'completion_tokens' => $data['completion_tokens'],
            ];
        }

        $schema = BattleResponseSchema::createPrismSchema(
            "code_generation",
            "Generate code in a specific language based on a task description",
            [
                "language" => "The programming language used",
                "task"     => "The description of the task",
                "code"     => "The generated code solution",
            ]
        );

        $provider = $this->getProviderForModel($ai_model_name);

        $start = microtime(true);

        $response = Prism::structured()
            ->using($provider, $ai_model_name)
            ->withSchema($schema)
            ->withPrompt($prompt)
            ->usingTemperature($temperature)
            ->asStructured();

        $end = microtime(true);

        $structured = $response->structured;

        return [
            'language'          => $structured['language'] ?? $programming_language,
            'task'              => $structured['task'] ?? $task_description,
            'code'              => $structured['code'] ?? null,
            'response_time_ms'  => (int)(($end - $start) * 1000),
            'prompt_tokens'     => $response->usage->promptTokens ?? null,
            'completion_tokens' => $response->usage->completionTokens ?? null,
        ];
    }

    public function getDebateChallengeResponse(
        string $ai_model_name,
        string $debate_topic,
        string $opponent_topic,
        ?string $opponent_response = null
    ): array {
        $prompt = $this->buildDebatePrompt($debate_topic, $opponent_topic, $opponent_response);

        if ($this->isOpenRouterModel($ai_model_name)) {
            $response = $this->callOpenRouterChat($prompt, $ai_model_name);
            return [
                'response' => $response
            ];
        }

        $provider = $this->getProviderForModel($ai_model_name);
        $schema = BattleResponseSchema::createPrismSchema(
            "debate_challenge",
            "Structured response for an AI vs AI debate",
            [
                "response" => "Respond to the debate in a single unified paragraph.",
            ]
        );

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
