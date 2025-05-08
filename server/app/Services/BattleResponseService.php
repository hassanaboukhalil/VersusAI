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

        if ($ai_model_name === 'gpt-4o' || $ai_model_name === 'gpt-4o' || $ai_model_name === 'gpt-4.1' || $ai_model_name === 'chatgpt-4o' || $ai_model_name === 'o3-mini') {
            $response = Prism::structured()
                ->using(Provider::OpenAI, $ai_model_name) //'gpt-4o'
                ->withSchema($schema)
                ->withPrompt($text_to_summarize)
                ->asStructured();
        }

        if ($ai_model_name === 'gemini-2.0-flash') {
            $response = Prism::structured()
                ->using(Provider::Gemini, $ai_model_name)
                ->withSchema($schema)
                ->withPrompt($text_to_summarize)
                ->asStructured();
        }

        return $response->structured;
    }


    // public function getTextSummarizationResponse() // $ai_model_name, $battle_type
    // {
    //     $schema = BattleResponseSchema::createPrismSchema(
    //         "joke",
    //         "A joke about programming",
    //         [
    //             "setup" => "This is the setup of the joke",
    //             "punchline" => "This is the punchline",
    //         ]
    //     );

    //     $response = Prism::structured()
    //         ->using(Provider::OpenAI, 'gpt-4o')
    //         ->withSchema($schema)
    //         ->withPrompt('Give me a funny programming joke')
    //         ->asStructured();

    //     return $response->structured;
    // }
}
