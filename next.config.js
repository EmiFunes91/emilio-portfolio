/** @type {import('next').NextConfig} */
// const withPWA = require('next-pwa')({
//   dest: 'public',
//   disable: true, // PWA desactivado hasta tener íconos listos
// });

const nextConfig = {
  reactStrictMode: true,
  
  // Optimizaciones de imágenes
  images: {
    formats: ['image/webp'],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
