const { storage } = require('../../dependencies');
const Company = require('../../models/Company');

const getById = async (id) => {
    const company = await Company.findById(id)
        .select('-__v');

    if(!company.logo) return company;

    const logoUrl = await storage.getFileUrl({
        key:`companyLogo/${company.logo}`,
    });

    company.logo = logoUrl;

    return company;
}

module.exports = getById;