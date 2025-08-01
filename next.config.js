/** @type {import('next').NextConfig} */
// const withPWA = require('next-pwa')({
//   dest: 'public',
//   disable: true, // PWA desactivado hasta tener íconos listos
// });

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Optimizaciones de imágenes
  images: {
    formats: ['image/webp'],
    dangerouslyAllowSVG: true,
  },
};
