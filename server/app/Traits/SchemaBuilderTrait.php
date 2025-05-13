<?php

namespace App\Traits;

use App\Schemas\BattleResponseSchema;
use Prism\Prism\Schema\ObjectSchema;

trait SchemaBuilderTrait
{
    protected function buildDebateSchema(): ObjectSchema
    {
        return BattleResponseSchema::createPrismSchema(
            "debate_challenge",
            "Structured response for an AI vs AI debate",
            [
                "response" => "Respond to the debate in a single unified paragraph.",
            ]
        );
    }

    protected function buildSummarizationSchema(): ObjectSchema
    {
        return BattleResponseSchema::createPrismSchema(
            "text_summarization",
            "Summarize a given text clearly and concisely",
            [
                "summary" => "A clear, concise summary of the input text in 3 to 4 lines max.",
            ]
        );
    }

    protected function buildTranslationSchema(): ObjectSchema
    {
        return BattleResponseSchema::createPrismSchema(
            "text_translation",
            "Translate a given text to another language",
            [
                "original" => "The original input text",
                "translated" => "The translated version of the text",
                "language" => "Target language",
            ]
        );
    }

    protected function buildCodeGenerationSchema(): ObjectSchema
    {
        return BattleResponseSchema::createPrismSchema(
            "code_generation",
            "Generate code in a specific language based on a task description",
            [
                "language" => "The programming language used",
                "task" => "The description of the task",
                "code" => "The generated code solution",
            ]
        );
    }
}
