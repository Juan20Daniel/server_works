const sharp = require('sharp');
const { AppError } = require('./error');

const optimizeImage = async (buffer, mimeType, options) => { 
    let image = await sharp(buffer)
        .rotate()
        .resize({
            width: options.width,
            height: options.height,
            fit: options.fit??'inside',
            withoutEnlargement: true //para que imagenes mas pequeñas no las estire
        });
    
    if(mimeType === "image/jpeg") {
        return image
            .jpeg({
                quality: options.jpegQuality
            })
            .toBuffer()
    }
    if(mimeType === "image/png") {
        return image
            .png({
                compressionLevel: options.pngcompressionLevel
            })
            .toBuffer()
    }

    throw new AppError(
        'UNSUPPORTED_MEDIA_TYPE',
        'Formato o tipo de archivo no soportado',
        true
    );
}

module.exports = optimizeImage;