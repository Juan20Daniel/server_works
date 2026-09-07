const getExtensionFromMimeType = (mimeType) => {
    const extensions = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/webp': 'webp'
    };

    return extensions[mimeType];
};

module.exports = getExtensionFromMimeType;