const MB = 1024 * 1024;
// 1 byte = 8 bits
// 1 KB ≈ 1024 bytes
// 1 MB ≈ 1024 KB
// 1 GB ≈ 1024 MB
const UPLOAD_POLICIES = {
    COMPANY_LOGO: {
        maxFileSize: 2 * MB,
        allowedMimeTypes: [
            'image/jpeg',
            'image/png',
        ]
    },

    PUBLICATION_IMAGE: {
        maxFileSize: 10 * MB,
        allowedMimeTypes: [
            'image/jpeg',
            'image/png',
            'image/webp'
        ]
    }
};

module.exports = UPLOAD_POLICIES;