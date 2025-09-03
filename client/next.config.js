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
    /* config options here */
};

module.exports = nextConfig;
