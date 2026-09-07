const User = require('../../models/User');

const getByEmail = async (email) => {
    return await User.findOne({email})
        .select('-__v');
}

module.exports = getByEmail;