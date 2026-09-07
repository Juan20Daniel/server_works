const Company = require('../../models/Company');

const getById = async (id) => {
    return await Company.findById(id)
        .select('-__v');
}

module.exports = getById;