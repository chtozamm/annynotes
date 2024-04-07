/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "annynotes.pockethost.io",
      },
    ],
  },
}

// const withPWA = require('next-pwa')({
//     dest: 'public',
//     register: true,
//     skipWaiting: true,
// });

// module.exports = withPWA(nextConfig);
module.exports = nextConfig
