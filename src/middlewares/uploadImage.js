const multer = require('multer');
const { randomUUID } = require('crypto');
const path = require('path');
const { file } = require('zod');
const { AppError } = require('../utils/error');

const storage = multer.memoryStorage();

const uploadImage = (policy) => {
    const upload = multer({
        storage,
        limits: {
            fileSize: policy.maxFileSize
        },
        fileFilter: (req, file, cb) => {
            if(policy.allowedMimeTypes.includes(file.mimetype)) {
                return cb(null, true);
            }
            cb(new AppError(
                'VALIDATION',
                'Formato de imagen no permitido',
                true
            ));
        }
    });

    return upload.single('image');
}

module.exports = uploadImage;