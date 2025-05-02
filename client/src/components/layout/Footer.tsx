import Image from 'next/image';
import { SOCIAL_LINKS } from '../../constants/social';
import { Button } from '../ui/button';
import Logo from './Logo';
import Section from './Section';

const Footer = () => {
    return (
        <Section className="bg-black mt-32" id="contact">
            <footer className="text-white pt-20 pb-6">
                <div className="text-center mb-10">
                    <p className="text-xs text-gray-400 tracking-widest mb-2 uppercase">
                        Smash the Future with AI Battles
                    </p>
                    <h2 className="h2 font-bold mb-4">Request More Information</h2>
                    <p className="text-gray-400 max-w-xl mx-auto mb-6">
                        VersusAI is the first platform that lets you compare LLMs head-to-head.
                        Watch, vote, and create epic AI showdowns.
                    </p>
                    <Button className="font-semibold rounded-md">Contact Us</Button>
                </div>
                <p className="text-center text-sm text-white/40 mt-8">© 2025 VersusAI</p>

                <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto mt-6">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <Logo withTitle />
                    </div>
                    <div className="flex items-center gap-4">
                        {SOCIAL_LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center border border-white/30 rounded-full transition"
                            >
                                <Image
                                    src={link.icon}
                                    alt={link.name}
                                    width={16}
                                    height={16}
                                    className="object-contain"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </footer>
        </Section>
    );
};
export default Footer;
