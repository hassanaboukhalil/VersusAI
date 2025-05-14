import Section from '../../../components/layout/Section';
import { PRICING_PLANS } from '../../../constants/pricing';
import { PricingCard } from '../../../components/global/PricingCard';

const page = () => {
    return (
        <Section className="bg-background min-h-screen py-12">
            <h1 className="text-white text-3xl font-bold mb-8">Upgrade your account</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto w-fit mt-16">
                {PRICING_PLANS.map((plan) => (
                    <PricingCard key={plan.name} plan={plan} />
                ))}
            </div>
        </Section>
    );
};
export default page;
