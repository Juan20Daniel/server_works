const { storage } = require('../../dependencies');
const Company = require('../../models/Company');

const get = async (query) => {
    let limit = 10;
    let page = 1;
   
    const where = {
        isActive:!query.active
    }
    if(query.createdBy) {
        console.log({createdBy:query.createdBy})
        where.createdBy = query.createdBy;
    }

    if(query.limit) {
        limit = query.limit <= 0 
            ? 1 
            : query.limit
    }
    if(query.page) {
        page = query.page <= 0 
            ? 1
            : query.page
    }

    const companies = await Company.find(where)
    .lean()
    .select('-__v')
    .limit(limit)
    .skip((page - 1) * limit);

    const promisesCompanyes = companies.map(async (company) => ({
        ...company,
        logo: company.logo 
            ? await storage.getFileUrl({key:`companyLogo/${company.logo}`})
            : null
    }));
    
    const result = await Promise.all(promisesCompanyes);
    
    return {
        companies: result,
        nextPage: Number(page)+1,
        limit: Number(limit)
    }
}

module.exports = get;