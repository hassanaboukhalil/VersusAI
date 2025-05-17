<?php

namespace App\Traits;

trait PromptBuilderTrait
{
    // protected function buildDebatePrompt(string $debate_topic, string $opponent_topic, ?string $opponent_response): string
    // {
    //     if ($opponent_response === null) {
    //         return "You are participating in a debate. Your position is: \"{$debate_topic}\". " .
    //             "You are debating against: \"{$opponent_topic}\". " .
    //             "Present a concise opening argument in 2-3 sentences. Be persuasive and focused.";
    //     }

    //     return "You are participating in a debate. Your position is: \"{$debate_topic}\". " .
    //         "Your opponent argued: \"{$opponent_response}\"\n\n" .
    //         "Respond to their argument in 2-3 sentences, defending your position and addressing their key points. " .
    //         "Be concise and impactful.";
    // }

    protected function buildDebatePrompt(string $debate_topic, string $opponent_topic, ?string $opponent_response): string
    {
        if ($opponent_response === null) {
            return
                <<<PROMPT
                        You are participating in a formal debate as an expert on the topic: "{$debate_topic}".
                        You are debating against someone who supports: "{$opponent_topic}".

                        Task:
                        - Write a clear and persuasive opening argument supporting your position.
                        - Limit your response to 2-3 sentences.
                        - Use strong reasoning and avoid emotional or vague statements.
                        - Do not include quotation marks, markdown symbols, bullet points, dashes, or special formatting in your response.
                        - Only return natural language sentences in plain text.
                        - If you’re unsure, respond with: “I don’t know”.
                    PROMPT;
        }

        return
            <<<PROMPT
                    You are continuing a formal AI-vs-AI debate.

                    Your stance: "{$debate_topic}"
                    Opponent's stance: "{$opponent_topic}"
                    Opponent's argument: "{$opponent_response}"

                    Task:
                    - Craft a concise rebuttal (2-3 sentences).
                    - Focus on defending your position while addressing the opponent's key claims.
                    - Be direct, logical, and maintain a professional tone.
                    - Do not repeat your previous arguments in exactly the same words.
                    - Do not include quotation marks, markdown symbols, bullet points, dashes, or special formatting in your response.
                    - Only return natural language sentences in plain text.
                    - If you’re unsure, respond with: “I don’t know”.
                PROMPT;
    }

    protected function buildSummarizationPrompt(string $text_to_summarize): string
    {
        return
            <<<PROMPT
                    You are a professional summarizer AI.

                    Task:
                    - Summarize the following content into 1 short paragraph (3–4 lines max).
                    - Focus on clarity, brevity, and factual accuracy.
                    - Avoid unnecessary embellishments or assumptions.
                    - Do not include quotation marks, markdown symbols, bullet points, dashes, or special formatting in your response.
                    - Only return natural language sentences in plain text.
                    - If you’re unsure, respond with: “I don’t know”.

                    Text:
                    {$text_to_summarize}
                PROMPT;
    }





    protected function buildTranslationPrompt(string $text, string $target_language): string
    {
        return
            <<<PROMPT
                    You are a professional translator AI.

                    Task:
                    - Provide ONLY the translated plain text output.
                    - Do NOT include quotation marks (unless in the original), backticks, markdown, bullet points, lists, or any other formatting.
                    - Do not explain the translation or add any extra text.

                    Text:
                    {$text}
                PROMPT;
    }

    protected function buildCodeGenerationPrompt(string $task_description, string $programming_language): string
    {
        return "Write code in {$programming_language} to accomplish the following task:\n\n{$task_description}\n\n" .
            "Important: Provide ONLY the code solution without any additional explanations or markdown formatting.";
    }
}
