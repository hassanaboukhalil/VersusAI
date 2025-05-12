export const BATTLE_TYPES = [
    'Text Summarization',
    'Text Translation',
    'Code Generation',
    'Debate Challenge',
] as const;

export type BattleType = (typeof BATTLE_TYPES)[number];
