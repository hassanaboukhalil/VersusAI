'use client';

import Section from '../../../components/layout/Section';
import { getUser, isUserPremium } from '../../../lib/auth';
import { PricingCard } from '../../../components/global/PricingCard';

const page = () => {
    const user = getUser();

    const PRICING_PLANS = [
        {
            name: 'Basic',
            price: 0,
            features: ['Explore battles', 'Vote on AI responses', 'View leaderboard'],
            excludedFeatures: ['Create battles', 'Comment on results'],
            cta: user ? (isUserPremium() ? 'Already Premium' : 'Current Plan') : 'Get Started',
            disabled: true,
        },
        {
            name: 'Premium',
            price: 10,
            features: [
                'Explore battles',
                'Vote on AI responses',
                'View leaderboard',
                'Create battles',
                'Comment on results',
            ],
            excludedFeatures: [],
            cta: user ? (isUserPremium() ? 'Already Premium' : 'Upgrade to Premium') : 'Go Premium',
            disabled: !!(user && isUserPremium()),
        },
    ];
    return (
        <Section className="bg-background min-h-screen py-12">
            <h2 className="h2 font-bold text-center">Upgrade your account</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto w-fit mt-16">
                {PRICING_PLANS.map((plan) => (
                    <PricingCard key={plan.name} plan={plan} />
                ))}
            </div>
        </Section>
    );
};
export default page;
