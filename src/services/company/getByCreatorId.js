const Company = require('../../models/Company');

const getByCreatorId = async (id, page=1, limit=10) => {
    const companies = await Company.find({
        createBy: id,
        isActive: true
    })
    .select('-__v')
    .limit(limit)
    .skip((page - 1) * limit)

    return {
        companies,
        nextPage: Number(page)+1,
        limit: Number(limit)
    }
}

module.exports = getByCreatorId;