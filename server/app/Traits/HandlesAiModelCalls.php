<?php

namespace App\Traits;

use Illuminate\Support\Facades\Http;

trait HandlesAiModelCalls
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

    public function callOpenRouterChat(string $prompt, string $model): string
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENROUTER_API_KEY'),
            'Content-Type'  => 'application/json',
            'HTTP-Referer'  => env('OPENROUTER_REFERER', 'https://versusai.local'),
            'X-Title'       => env('OPENROUTER_TITLE', 'VersusAI'),
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


    private function isOpenRouterModel(string $model): bool
    {
        return str_contains($model, ':free') || str_contains($model, 'openrouter/');
    }
}
