// Script profesional para optimizar imágenes de proyectos a versión móvil (360px de ancho)
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, '../public/projects');
const widthMobile = 360;
const quality = 85;

fs.readdirSync(projectsDir).forEach((project) => {
  const projectPath = path.join(projectsDir, project);
  if (!fs.statSync(projectPath).isDirectory()) return;
  fs.readdirSync(projectPath).forEach((file) => {
    if (file.endsWith('.png')) {
      const inputPath = path.join(projectPath, file);
      const outputName = file.replace(/\.png$/, '-mobile.webp');
      const outputPath = path.join(projectPath, outputName);
      sharp(inputPath)
        .resize({ width: widthMobile })
        .webp({ quality })
        .toFile(outputPath)
        .then(() => console.log(`Optimized: ${outputPath}`))
        .catch((err) => console.error(`Error optimizing ${inputPath}:`, err));
    }
  });
}); 