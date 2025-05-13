export const PROGRAMMING_LANGUAGES = [
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'PHP',
    'Ruby',
    'Go',
    'TypeScript',
    'C#',
    'Swift',
] as const;

export type ProgrammingLanguage = (typeof PROGRAMMING_LANGUAGES)[number];
