const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Directorio de imágenes
const imageDir = './';

// Extensiones de imagen a convertir
const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp'];

// Calidad WebP (80% recomendado para balance calidad/tamaño)
const WEBP_QUALITY = 80;

// Función para convertir imagen a WebP
async function convertToWebP(inputPath, outputPath) {
    try {
        await sharp(inputPath)
            .webp({ quality: WEBP_QUALITY })
            .toFile(outputPath);

        const inputStats = fs.statSync(inputPath);
        const outputStats = fs.statSync(outputPath);
        const savings = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(1);

        console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
        console.log(`   Tamaño original: ${(inputStats.size / 1024).toFixed(1)} KB`);
        console.log(`   Nuevo tamaño: ${(outputStats.size / 1024).toFixed(1)} KB`);
        console.log(`   Ahorro: ${savings}%`);
        console.log('');

        return true;
    } catch (error) {
        console.error(`❌ Error convirtiendo ${inputPath}:`, error.message);
        return false;
    }
}

// Función principal
async function convertAllImages() {
    console.log('🚀 Iniciando conversión de imágenes a WebP...\n');

    try {
        // Leer archivos del directorio
        const files = fs.readdirSync(imageDir);
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return imageExtensions.includes(ext);
        });

        if (imageFiles.length === 0) {
            console.log('❌ No se encontraron imágenes para convertir en el directorio actual.');
            return;
        }

        console.log(`📁 Encontradas ${imageFiles.length} imágenes para convertir:\n`);

        let converted = 0;
        let totalSavings = 0;
        let originalTotalSize = 0;
        let newTotalSize = 0;

        // Convertir cada imagen
        for (const file of imageFiles) {
            const inputPath = path.join(imageDir, file);
            const outputPath = path.join(imageDir, path.parse(file).name + '.webp');

            // Verificar si ya existe WebP
            if (fs.existsSync(outputPath)) {
                console.log(`⚠️  ${file} ya tiene versión WebP, saltando...`);
                continue;
            }

            const inputStats = fs.statSync(inputPath);
            originalTotalSize += inputStats.size;

            const success = await convertToWebP(inputPath, outputPath);

            if (success) {
                const outputStats = fs.statSync(outputPath);
                newTotalSize += outputStats.size;
                totalSavings += (inputStats.size - outputStats.size);
                converted++;
            }
        }

        // Resumen final
        console.log('📊 Resumen de conversión:');
        console.log(`   Imágenes convertidas: ${converted}/${imageFiles.length}`);
        console.log(`   Tamaño original total: ${(originalTotalSize / 1024).toFixed(1)} KB`);
        console.log(`   Nuevo tamaño total: ${(newTotalSize / 1024).toFixed(1)} KB`);
        console.log(`   Ahorro total: ${(totalSavings / 1024).toFixed(1)} KB (${((totalSavings / originalTotalSize) * 100).toFixed(1)}%)`);

        if (converted > 0) {
            console.log('\n💡 Para usar las imágenes WebP en HTML, actualiza las etiquetas <img>:');
            console.log('   <picture>');
            console.log('     <source srcset="imagen.webp" type="image/webp">');
            console.log('     <img src="imagen.png" alt="Descripción">');
            console.log('   </picture>');
        }

    } catch (error) {
        console.error('❌ Error durante la conversión:', error.message);
    }
}

// Ejecutar conversión
convertAllImages().catch(console.error);