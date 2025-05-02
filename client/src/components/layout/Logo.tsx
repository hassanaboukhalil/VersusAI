import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
    withTitle: boolean;
    width?: number;
    height?: number;
}

const Logo = ({ withTitle, width = 32, height = 32 }: LogoProps) => {
    const logoSrc = '/logo.svg';
    return (
        <Link href="/" className="flex justify-center items-center gap-2 cursor-pointer">
            <Image src={logoSrc} alt="logo" width={width} height={height} />
            {withTitle && <span className="text-xl leading-[0]">VersusAI</span>}
        </Link>
    );
};

export default Logo;
