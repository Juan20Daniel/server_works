const User = require('../../models/User');

const getById = async (id) => {
    return await User.findById(id)
    .select('-__v -createdAt -updatedAt');
}

module.exports = getById;