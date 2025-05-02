import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#DEFE01',
                secondary: '#6B46C1',
                background: {
                    DEFAULT: '#0A0A0A',
                },
                dark_white: '#F3F4F6',
                light_gray: '#9094A9',
            },
        },
    },
    plugins: [],
};

export default config;
