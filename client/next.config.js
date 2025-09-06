// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     // allow ESLint/TS errors to pass in CI
//     eslint: {
//         ignoreDuringBuilds: true,
//     },
//     typescript: {
//         ignoreBuildErrors: true,
//     },

//     // this section will proxy /api/* → your HTTP backend
//     async rewrites() {
//         return [
//             {
//                 source: '/api/:path*',
//                 destination: process.env.NEXT_PUBLIC_BACKEND_URL + '/api/:path*',
//                 // destination: 'http://13.51.158.192:8000/api/:path*',
//             },
//         ];
//     },
// };

// module.exports = nextConfig;

// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: process.env.NEXT_PUBLIC_BACKEND_HOSTNAME || 'localhost',
                port: process.env.NEXT_PUBLIC_BACKEND_PORT || '8000',
                pathname: '/storage/**',
                search: '',
            },
        ],
    },
};

module.exports = nextConfig;
