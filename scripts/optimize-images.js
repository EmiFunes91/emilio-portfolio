const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuración de optimización
const OPTIMIZATION_CONFIG = {
  quality: 85,
  formats: ['webp', 'avif'],
  sizes: [
    { width: 400, height: 300, suffix: 'thumb' },
    { width: 800, height: 600, suffix: 'medium' },
    { width: 1200, height: 900, suffix: 'large' }
  ]
};

// Función para optimizar una imagen
async function optimizeImage(inputPath, outputDir, filename) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Crear directorio de salida si no existe
    await fs.mkdir(outputDir, { recursive: true });
    
    // Optimizar en diferentes formatos
    for (const format of OPTIMIZATION_CONFIG.formats) {
      const outputPath = path.join(outputDir, `${filename}.${format}`);
      
      await image
        .resize(metadata.width, metadata.height, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .toFormat(format, { quality: OPTIMIZATION_CONFIG.quality })
        .toFile(outputPath);
      
      console.log(`✅ Optimized: ${outputPath}`);
    }
    
    // Crear diferentes tamaños
    for (const size of OPTIMIZATION_CONFIG.sizes) {
      for (const format of OPTIMIZATION_CONFIG.formats) {
        const outputPath = path.join(outputDir, `${filename}-${size.suffix}.${format}`);
        
        await image
          .resize(size.width, size.height, {
            fit: 'cover',
            position: 'center'
          })
          .toFormat(format, { quality: OPTIMIZATION_CONFIG.quality })
          .toFile(outputPath);
        
        console.log(`✅ Resized: ${outputPath}`);
      }
    }
    
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
  }
}

// Función para procesar directorio de proyectos
async function processProjectsDirectory() {
  const projectsDir = path.join(__dirname, '../public/projects');
  
  try {
    const projects = await fs.readdir(projectsDir);
    
    for (const project of projects) {
      const projectPath = path.join(projectsDir, project);
      const stats = await fs.stat(projectPath);
      
      if (stats.isDirectory()) {
        console.log(`\n📁 Processing project: ${project}`);
        
        const files = await fs.readdir(projectPath);
        const imageFiles = files.filter(file => 
          /\.(jpg|jpeg|png|gif|bmp|tiff)$/i.test(file)
        );
        
        for (const imageFile of imageFiles) {
          const inputPath = path.join(projectPath, imageFile);
          const filename = path.parse(imageFile).name;
          const outputDir = path.join(projectPath, 'optimized');
          
          console.log(`🖼️  Optimizing: ${imageFile}`);
          await optimizeImage(inputPath, outputDir, filename);
        }
      }
    }
    
    console.log('\n🎉 Image optimization completed!');
    
  } catch (error) {
    console.error('❌ Error processing projects directory:', error.message);
  }
}

// Función para crear placeholders
async function createPlaceholders() {
  const placeholderDir = path.join(__dirname, '../public/images/placeholders');
  
  try {
    await fs.mkdir(placeholderDir, { recursive: true });
    
    // Crear placeholder básico
    const placeholder = sharp({
      create: {
        width: 800,
        height: 600,
        channels: 3,
        background: { r: 200, g: 200, b: 200 }
      }
    });
    
    await placeholder
      .jpeg({ quality: 60 })
      .toFile(path.join(placeholderDir, 'placeholder.jpg'));
    
    await placeholder
      .webp({ quality: 60 })
      .toFile(path.join(placeholderDir, 'placeholder.webp'));
    
    console.log('✅ Placeholders created');
    
  } catch (error) {
    console.error('❌ Error creating placeholders:', error.message);
  }
}

// Función principal
async function main() {
  console.log('🚀 Starting image optimization...\n');
  
  try {
    await processProjectsDirectory();
    await createPlaceholders();
    
    console.log('\n✨ All optimizations completed successfully!');
    
  } catch (error) {
    console.error('❌ Optimization failed:', error.message);
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = {
  optimizeImage,
  processProjectsDirectory,
  createPlaceholders
}; 