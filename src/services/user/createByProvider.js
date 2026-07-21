const User = require('../../models/User');
const getById = require('./getById');
const avatarColor = require('../../utils/avatarColor');

const createByProvider = async (profile, provider) => {
    const newUser = await User.create({
        profile_image: profile.picture??null,
        firstname: profile.given_name,
        lastname: profile.family_name,
        email: profile.email,
        password: null,
        provider: provider,
        provider_id: profile.sub,
        avatarColor: avatarColor()
    });
    
    return await getById(newUser._id);
}

module.exports = createByProvider;