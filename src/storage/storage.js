const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

class S3Storage {
    constructor(client, bucket) {
        this.client = client;
        this.bucket = bucket;
    }

    async uploadFile({key, buffer, contentType}) {
        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: buffer,
            ContentType: contentType
        });

        await this.client.send(command);

        return key;
    }
    getFileUrl({key, expiresIn = 900}) {
        const command = new GetObjectCommand({
            Bucket: this.bucket,
            Key: key
        });

        return getSignedUrl(
            this.client,
            command,
            {expiresIn}
        );
    }
}

module.exports = S3Storage;