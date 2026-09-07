const { randomUUID } = require('crypto');
const Company = require('../../models/Company');
const getExtensionFromMimeType = require('../../utils/getExtensionFromMimeType');
const getById = require('./getById');
const optimizeImage = require('../../utils/optimizeImage');
const { storage } = require('../../dependencies');

const createCompany = async (user, data, file) => {
    const { name, desc } = data;
    let logoName = null;
    
    if(file) {
        const extension = getExtensionFromMimeType(file.mimetype);
        logoName = `${randomUUID()}.${extension}`;
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
    }
    
    const newCompany = await Company.create({
        logo: logoName,
        name: name,
        desc: desc,
        createBy: user.id
    });

    return await getById(newCompany._id);
}

module.exports = createCompany;