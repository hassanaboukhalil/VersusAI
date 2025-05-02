import { Check, X } from 'lucide-react';
import { PRICING_PLANS } from '../../../constants/pricing';
import Section from '../../../components/layout/Section';
import { Button } from '../../ui/button';

const Pricing = () => {
    return (
        <Section className="py-16 text-white mt-52" id="pricing">
            <h2 className="h2 font-bold text-center">Pricing Tiers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto w-fit mt-16">
                {PRICING_PLANS.map((plan) => (
                    <div
                        key={plan.name}
                        className="bg-dark-white rounded-xl p-6 flex flex-col items-start shadow-md border border-white/10 w-72"
                    >
                        <h3 className="text-3xl text-primary font-semibold">{plan.name}</h3>
                        <div className="text-6xl font-bold mb-1 mt-14">
                            ${plan.price}
                            <span className="text-lg font-medium text-gray-400">/Month</span>
                        </div>
                        <Button variant="default" className="bg-primary px-6 py-2 mt-4 mb-6 w-full">
                            {plan.cta}
                        </Button>
                        <ul className="space-y-3 w-full my-6">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-6 text-sm">
                                    <Check className="w-4 h-4 text-purple-500" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                            {plan.excludedFeatures.map((feature) => (
                                <li
                                    key={feature}
                                    className="flex items-center gap-6 text-sm text-white/70"
                                >
                                    <X className="w-4 h-4 text-red-500" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default Pricing;
