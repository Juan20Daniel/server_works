const { randomUUID } = require('crypto');
const Company = require('../../models/Company');
const getExtensionFromMimeType = require('../../utils/getExtensionFromMimeType');
const getCompanyById = require('./getById');
const optimizeImage = require('../../utils/optimizeImage');
const { storage } = require('../../dependencies');

const processImage = async (file) => {
    if(!file) return null;

    const extension = getExtensionFromMimeType(file.mimetype);
    const logoName = `${randomUUID()}.${extension}`;

    const buffer = await optimizeImage(file.buffer, file.mimetype, {
        width: 600,
        height: 400,
        jpegQuality: 70,
        pngcompressionLevel: 8
    });
    
    await storage.uploadFile({
        key: `companyLogo/${logoName}`,
        buffer: buffer,
        contentType: extension
    });

    return logoName;
}

const createCompany = async (user, data, file) => {
    const { name, desc } = data;
    let logoName = await processImage(file);

    const { _id:newCompanyId } = await Company.create({
        logo: logoName,
        name: name,
        desc: desc,
        createBy: user.id
    });

    return await getCompanyById(newCompanyId);
}

module.exports = createCompany;