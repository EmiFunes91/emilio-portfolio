/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: true, // PWA desactivado hasta tener íconos listos
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    // Configuración de dominios externos si los necesitás
  },
};

module.exports = withPWA(nextConfig);
