/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

const config = {
    experimental: {
        serverActions: true
    }
}

const nextConfig = withPWA({
    dest: 'public',
})(
    config
);

module.exports = nextConfig

