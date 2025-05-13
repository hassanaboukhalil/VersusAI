<?php

namespace App\Services;

use App\Schemas\BattleResponseSchema;
use App\Traits\HandlesAiModelCalls;
use Illuminate\Support\Facades\Http;
use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;
use App\Models\Battle;
use App\Models\BattleRound;
use App\Models\BattleResponse;

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


    public function getDebateChallengeResponse(string $ai_model_name, string $debate_topic, string $opponent_topic, ?string $opponent_response = null)
    {
        $prompt = $this->buildDebatePrompt($debate_topic, $opponent_topic, $opponent_response);

        // 1. Handle via Prism
        if ($this->isPrismModel($ai_model_name)) {
            return $this->callPrismChat($prompt);
        }

        // 2. Handle via OpenRouter
        if ($this->isOpenRouterModel($ai_model_name)) {
            $response = $this->callOpenRouterChat($prompt, $ai_model_name);
            return [
                'response' => $response
            ];
        }

        // 3. Handle via OpenAI
        return $this->callOpenAiChat($prompt);
    }

    private function buildDebatePrompt(string $debate_topic, string $opponent_topic, ?string $opponent_response): string
    {
        if ($opponent_response === null) {
            return "You are participating in a debate. Your position is: \"{$debate_topic}\". " .
                "You are debating against: \"{$opponent_topic}\". " .
                "Present a concise opening argument in 2-3 sentences. Be persuasive and focused.";
        }

        return "You are participating in a debate. Your position is: \"{$debate_topic}\". " .
            "Your opponent argued: \"{$opponent_response}\"\n\n" .
            "Respond to their argument in 2-3 sentences, defending your position and addressing their key points. " .
            "Be concise and impactful.";
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

    private function isPrismModel(string $model): bool
    {
        return str_contains($model, 'prism');
    }

    private function callPrismChat(string $prompt)
    {
        $schema = BattleResponseSchema::createPrismSchema(
            "debate_challenge",
            "Structured response for an AI vs AI debate",
            [
                "response" => "Respond to the debate in a single unified paragraph.",
            ]
        );

        $response = Prism::structured()
            ->using('prism', env('PRISM_API_KEY'))
            ->withSchema($schema)
            ->withPrompt($prompt)
            ->asStructured();

        return $response->structured;
    }

    private function callOpenAiChat(string $prompt)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4-turbo-preview',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a skilled debater participating in an AI debate competition.'],
                ['role' => 'user', 'content' => $prompt]
            ],
            'temperature' => 0.7,
            'max_tokens' => 500,
        ]);

        if ($response->failed()) {
            throw new \Exception('OpenAI API request failed: ' . $response->body());
        }

        $data = $response->json();
        return [
            'response' => $data['choices'][0]['message']['content']
        ];
    }

    public function createDebateResponse(Battle $battle, ?string $opponent_response = null, ?int $round_id = null)
    {
        if ($round_id === null) {
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
                $opponent_response
            );

            $response_text = is_array($response) ? $response['response'] : $response;

            $battleResponse = BattleResponse::create([
                'battle_round_id' => $round->id,
                'ai_model_id' => $battle->ai_model_1_id,
                'response_text' => $response_text,
            ]);

            return [
                'id' => $round->id,
                'ai_model_name' => $battle->ai_model_1->model_name,
                'response_text' => $battleResponse->response_text,
            ];
        } else {
            // Add second response to existing round
            $round = BattleRound::findOrFail($round_id);

            $response = $this->getDebateChallengeResponse(
                $battle->ai_model_2->model_name,
                $battle->debate_title_2,
                $battle->debate_title_1,
                $opponent_response
            );

            $response_text = is_array($response) ? $response['response'] : $response;

            $battleResponse = BattleResponse::create([
                'battle_round_id' => $round->id,
                'ai_model_id' => $battle->ai_model_2_id,
                'response_text' => $response_text,
            ]);

            return [
                'ai_model_name' => $battle->ai_model_2->model_name,
                'response_text' => $battleResponse->response_text,
            ];
        }
    }
}
