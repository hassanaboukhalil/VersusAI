<?php

namespace App\Traits;

trait PromptBuilderTrait
{
    protected function buildDebatePrompt(string $debate_topic, string $opponent_topic, ?string $opponent_response): string
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

    protected function buildSummarizationPrompt(string $text_to_summarize): string
    {
        return "Summarize the following text in a short, clear paragraph (no more than 3–4 lines):\n\n" . $text_to_summarize;
    }

    protected function buildTranslationPrompt(string $text, string $target_language): string
    {
        return "Translate the following text to {$target_language}. Important: Give me ONLY the direct translation as plain text. Do not include:\n" .
            "- No triple backticks (```) or single backticks (`)\n" .
            "- No markdown formatting (no *, **, _, __, #, ##, etc.)\n" .
            "- No bullet points or numbered lists\n" .
            "- No quotation marks unless they are part of the original text\n\n" .
            "Here's the text to translate:\n{$text}";
    }

    protected function buildCodeGenerationPrompt(string $task_description, string $programming_language): string
    {
        return "Write code in {$programming_language} to accomplish the following task:\n\n{$task_description}\n\n" .
            "Important: Provide ONLY the code solution without any additional explanations or markdown formatting.";
    }
}
