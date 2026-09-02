const { PutObjectCommand } = require('@aws-sdk/client-s3');

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
}

module.exports = S3Storage;