const User = require('../../models/User');

const update = async (data) => {
    try {
        const userUpdated = await User.findByIdAndUpdate(data.id, data);
        const user = await User.findById(userUpdated._id);
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = update;