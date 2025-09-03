'use client';

import { Check, X } from 'lucide-react';
import CheckoutButton from '../pages-components/pricing/CheckoutButton';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

export interface PricingPlan {
    name: string;
    price: number;
    cta: string;
    features: string[];
    excludedFeatures: string[];
    disabled: boolean;
    link: string;
}

interface PricingCardPremiumps {
    plan: PricingPlan;
}

export const PricingCard = ({ plan }: PricingCardPremiumps) => {
    const router = useRouter();
    return (
        <div className="bg-dark-white rounded-xl p-6 flex flex-col items-start shadow-md border border-white/10 w-72">
            <h3 className="text-3xl text-primary font-semibold">{plan.name}</h3>
            <div className="text-6xl font-bold mb-1 mt-14">
                ${plan.price}
                <span className="text-lg font-medium text-gray-400">/Month</span>
            </div>
            {plan.link ? (
                <Button
                    type="submit"
                    className="w-full bg-primary text-black hover:opacity-90"
                    onClick={() => router.push(plan.link)}
                >
                    {plan.cta}
                </Button>
            ) : (
                <CheckoutButton buttonText={plan.cta} disabled={plan.disabled || false} />
            )}
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
