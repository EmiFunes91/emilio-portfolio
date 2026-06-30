// Script profesional para optimizar imágenes de Smart Advisor
// Requiere: sharp
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuración
const srcDir = path.join(__dirname, '../public/projects/smart-advisor');
const maxWidth = 1600;

// Nombres y alt-texts profesionales (ajustar según imágenes reales)
const imagesInfo = [
  {
    src: 'login',
    alt: {
      es: 'Pantalla de login de Smart Advisor App – SaaS legal con IA',
      en: 'Login screen of Smart Advisor App – Legal AI SaaS',
    },
  },
  {
    src: 'register',
    alt: {
      es: 'Registro profesional en Smart Advisor App',
      en: 'Professional registration in Smart Advisor App',
    },
  },
  {
    src: 'pricing',
    alt: {
      es: 'Planes y precios de suscripción en Smart Advisor',
      en: 'Subscription plans and pricing in Smart Advisor',
    },
  },
  {
    src: 'dashboard',
    alt: {
      es: 'Dashboard principal de Smart Advisor App',
      en: 'Main dashboard of Smart Advisor App',
    },
  },
  {
    src: 'faq',
    alt: {
      es: 'Sección de preguntas frecuentes en Smart Advisor',
      en: 'FAQ section in Smart Advisor',
    },
  },
];

(async () => {
  for (const info of imagesInfo) {
    // Buscar archivo fuente (puede ser PNG o JPG)
    const srcFile = fs
      .readdirSync(srcDir)
      .find(f => f.toLowerCase().startsWith(info.src) && (f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg')));
    if (!srcFile) {
      console.warn(`No se encontró imagen fuente para: ${info.src}`);
      continue;
    }
    const inputPath = path.join(srcDir, srcFile);
    const outputPath = path.join(srcDir, `${info.src}.webp`);
    // Convertir y redimensionar
    await sharp(inputPath)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: 90 })
      .toFile(outputPath);
    console.log(`Optimizada: ${outputPath}`);
  }

  // Generar array JS para el portfolio
  const arr = imagesInfo.map(info => ({
    src: `/projects/smart-advisor/${info.src}.webp`,
    alt: info.alt,
  }));
  fs.writeFileSync(
    path.join(srcDir, 'smart-advisor-images.json'),
    JSON.stringify(arr, null, 2),
    'utf-8'
  );
  console.log('Array de imágenes y alt-text generado en smart-advisor-images.json');
})(); 