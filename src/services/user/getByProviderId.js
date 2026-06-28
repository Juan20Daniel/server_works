const User = require('../../models/User');

const getByProviderId = async (id) => {
    try {
        return await User.findOne({provider_id:id})
        .select('-__v -createdAt -updatedAt');
    } catch (error) {
        throw error;
    }
}

module.exports = getByProviderId;