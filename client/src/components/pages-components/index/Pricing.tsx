import { PRICING_PLANS } from '../../../constants/pricing';
import Section from '../../../components/layout/Section';
import { PricingCard } from '../../global/PricingCard';

const Pricing = () => {
    return (
        <Section className="py-16 text-white mt-52" id="pricing">
            <h2 className="h2 font-bold text-center">Pricing Tiers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto w-fit mt-16">
                {PRICING_PLANS.map((plan) => (
                    <PricingCard key={plan.name} plan={plan} />
                ))}
            </div>
        </Section>
    );
};

export default Pricing;
