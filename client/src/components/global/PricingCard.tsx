'use client';

import { Check, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { getUser } from '../../lib/auth';

export interface PricingPlan {
    name: string;
    price: number;
    cta: string;
    features: string[];
    excludedFeatures: string[];
}

interface PricingCardProps {
    plan: PricingPlan;
}

export const PricingCard = ({ plan }: PricingCardProps) => {
    const [isPremium, setIsPremium] = useState(false);
    const [buttonText, setButtonText] = useState(plan.cta);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const user = getUser();
        const userIsPremium = user?.is_premium || false;
        setIsPremium(userIsPremium);

        if (userIsPremium && plan.name === 'Pro') {
            setButtonText('Your current plan');
        } else {
            setButtonText(plan.cta);
        }

        setIsLoaded(true);
    }, [plan.name, plan.cta]);

    return (
        <div className="bg-dark-white rounded-xl p-6 flex flex-col items-start shadow-md border border-white/10 w-72">
            <h3 className="text-3xl text-primary font-semibold">{plan.name}</h3>
            <div className="text-6xl font-bold mb-1 mt-14">
                ${plan.price}
                <span className="text-lg font-medium text-gray-400">/Month</span>
            </div>
            <Button
                variant="default"
                className={`px-6 py-2 mt-4 mb-6 w-full ${isLoaded && isPremium && plan.name === 'Pro' ? 'bg-green-600' : 'bg-primary'}`}
                disabled={isLoaded && isPremium && plan.name === 'Pro'}
            >
                {buttonText}
            </Button>
            <ul className="space-y-3 w-full my-6">
                {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-6 text-sm">
                        <Check className="w-4 h-4 text-purple-500" />
                        <span>{feature}</span>
                    </li>
                ))}
                {plan.excludedFeatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-6 text-sm text-white/70">
                        <X className="w-4 h-4 text-red-500" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
