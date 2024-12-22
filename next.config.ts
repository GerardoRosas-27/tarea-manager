/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      enabled: true, // Desactiva Turbopack
    },
  },
};

module.exports = nextConfig;
