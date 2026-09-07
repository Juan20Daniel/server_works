const s3Client = require('../config/s3');
const S3Storage = require('../storage');

const storage = new S3Storage(
    s3Client,
    process.env.AWS_S3_BUCKET
);

module.exports = storage;