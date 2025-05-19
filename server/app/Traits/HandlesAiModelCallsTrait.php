<?php

namespace App\Traits;

use Illuminate\Support\Facades\Http;

trait HandlesAiModelCallsTrait
{
    public function callDeepSeekChat(string $prompt, string $model = 'deepseek-chat'): string
    {
        // not free
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('DEEPSEEK_API_KEY'),
            'Content-Type'  => 'application/json',
        ])->post('https://api.deepseek.com/v1/chat/completions', [
            'model'    => $model,
            'messages' => [
                [
                    'role'    => 'system',
                    'content' => 'You are a helpful assistant.',
                ],
                [
                    'role'    => 'user',
                    'content' => $prompt,
                ],
            ],
        ]);

        if ($response->failed()) {
            throw new \Exception('DeepSeek API call failed: ' . $response->body());
        }

        return $response->json('choices.0.message.content');
    }


    public function callOpenRouterDeepSeek(string $prompt, string $model): string
    {
        $model = "deepseek/deepseek-prover-v2:free";
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENROUTER_API_KEY'),
            'Content-Type'  => 'application/json',
        ])->post('https://openrouter.ai/api/v1/chat/completions', [
            'model'    => $model,
            'messages' => [
                [
                    'role'    => 'user',
                    'content' => $prompt,
                ]
            ],
        ]);

        if ($response->failed()) {
            throw new \Exception('OpenRouter API call failed: ' . $response->body());
        }

        return $response->json('choices.0.message.content');
    }

    public function callOpenRouterChat(string $prompt, string $model, float $temperature = 0.2)
    {
        $model = match (true) {
            str_contains($model, 'deepseek-prover-v2') => 'deepseek/deepseek-prover-v2:free',
            str_contains($model, 'meta-llama')      => $model,
            str_contains($model, 'mixtral')         => $model,
            $model === 'Groq'                       => 'meta-llama/llama-4-scout-17b-16e-instruct',
        };

        $start = microtime(true);
        $http = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENROUTER_API_KEY'),
            'Content-Type'  => 'application/json',
            'HTTP-Referer'  => env('OPENROUTER_REFERER', 'https://versusai.local'),
            'X-Title'       => env('OPENROUTER_TITLE', 'VersusAI'),
        ])->post('https://openrouter.ai/api/v1/chat/completions', [
            'model'    => $model,
            'messages' => [
                ['role' => 'user', 'content' => $prompt],
            ],
            'temperature' => $temperature,
        ]);
        $end = microtime(true);

        if ($http->failed()) {
            throw new \Exception('OpenRouter API call failed: ' . $http->body());
        }

        $json = $http->json();

        $result = $json['choices'][0]['message']['content'] ?? null;

        $promptTokens     = $json['usage']['prompt_tokens']     ?? null;
        $completionTokens = $json['usage']['completion_tokens'] ?? null;

        $data = [
            'result' => $result,
            'response_time_ms'  => (int)(($end - $start) * 1000),
            'prompt_tokens'     => $promptTokens,
            'completion_tokens' => $completionTokens,
        ];

        return $data;
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


    // private function isOpenRouterModel(string $model): bool
    // {
    //     return match (true) {
    //         str_contains($model, 'deepseek-prover-v2') => true,
    //         str_contains($model, 'meta-llama') => true,
    //         str_contains($model, 'mixtral') => true,
    //         $model === 'Groq' => true,
    //         default => false,
    //     };
    // }
}
