export interface Feature {
    title: string;
    description: string;
    image?: string;
}

export const FEATURES: Feature[] = [
    {
        title: 'Create or Discover AI Battles',
        description:
            'Start new head-to-head challenges between powerful AI models, or explore existing ones to see how they performed on real-world tasks.',
        image: '/images/features/ai-battle.png',
    },
    {
        title: 'Choose AIs to Compete',
        description:
            'Select two AI models like GPT-4, Claude, or Gemini to face off in a battle and generate results to compare side by side.',
        image: '/images/features/choose-ais.png',
    },
    {
        title: 'Vote for the Best AI',
        description:
            'View AI responses side by side and vote for the one that performed best. Your decisions help shape the overall rankings.',
        image: '/images/features/vote.png',
    },
    {
        title: 'Check the Leaderboard',
        description:
            'Track which AI models are dominating the charts based on votes, sorted by challenge type like summarization and coding.',
        image: '/images/features/leaderboard.png',
    },
    // {
    //     title: 'Follow & Bookmark',
    //     description:
    //         'Follow your favorite users and bookmark AI battles to easily revisit and keep track of the most interesting challenges.',
    //     image: '/images/features/ai-battle.png',
    // },
];
