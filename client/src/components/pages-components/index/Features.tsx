// import Section from '@/components/layout/Section';
import Image from 'next/image';
import Section from '../../../components/layout/Section';
import { FEATURES } from '../../../constants/features';

const Features = () => {
    return (
        <Section className="flex flex-center flex-col mt-52" id="features">
            <h2 className="h2 text-center">
                What You Can Do on <span className="text-primary">VersusAI</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-0 xl:px-16 mt-16">
                {FEATURES.map((feature, index) => (
                    <div
                        key={feature.title}
                        className={`
                            rounded-xl p-4 border border-white/10 shadow-md hover:shadow-lg transition-shadow bg-dark-white
                            ${index === 0 || index == 3 ? 'lg:col-span-2' : ''}
                        `}
                    >
                        <div className="relative w-full h-72 rounded-md overflow-hidden mb-4">
                            <Image
                                src={feature.image!}
                                alt={feature.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="text-lg font-semibold mb-1 text-white">{feature.title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </Section>
    );
};
export default Features;
