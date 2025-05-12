export const AI_MODELS = [
    'gpt-4o',
    'gpt-4.1',
    'o3-mini',
    'chatgpt-4o',
    'deepseek-prover-v2',
    'gemini-2.0-flash',
] as const;

export type AIModel = (typeof AI_MODELS)[number];
