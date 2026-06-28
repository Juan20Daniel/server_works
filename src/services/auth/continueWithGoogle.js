const { AppError } = require('../../utils/error');
const { createToken, createRefreshToken } = require('../../utils/jwt');
const { OAuth2Client } = require('google-auth-library');
const User = require('../../models/User');
const userService = require('../user');
const client = new OAuth2Client();

const createAuth = (user) => {
    const token = createToken({id:user._id, role:user.role});
    const refreshToken = createRefreshToken(user._id);
    const auth = {
        token:`Bearer ${token}`,
        refreshToken: `Bearer ${refreshToken}`
    }

    return auth;
}

const updateUser = async (lastUser, newUser) => {
    const fieldsToUpdate = {}

    if(newUser.given_name !== lastUser.firstname) {
        fieldsToUpdate.firstname = newUser.given_name;
    }
    if(newUser.family_name !== lastUser.lastname) {
        fieldsToUpdate.lastname = newUser.family_name;
    }
    if(newUser.email !== lastUser.email) {
        fieldsToUpdate.email = newUser.email;
    }
    if(newUser.picture !== lastUser.profile_image) {
        fieldsToUpdate.profile_image = newUser.picture;
    }
   
    if(Object.values(fieldsToUpdate).length === 0) {
        return userService.getById(lastUser._id);
    }

    fieldsToUpdate.id = lastUser._id;

    try {
        await userService.update(fieldsToUpdate);
        return userService.getById(fieldsToUpdate.id);
    } catch (error) {
        throw error;
    }
}

const continueWithGoogle = async (idToken) => {
    const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: [
            process.env.GOOGLE_CLIENT_ID_ANDROID,
            process.env.GOOGLE_CLIENT_ID_IOS
        ]
    });

    const payload = ticket.getPayload();

    let [ user, emailExists ] = await Promise.all([
        userService.getByProviderId(payload.sub),
        userService.getByEmail(payload.email),
    ]);

    if(emailExists && !user) {
        throw new AppError('DUPLICATE_EMAIL', 'El correo ya existe',true);
    }

    if(!user) {
        const newUser = await User.create({
            profile_image: payload.picture??null,
            firstname: payload.given_name,
            lastname: payload.family_name,
            email: payload.email,
            password: null,
            provider: 'google',
            provider_id: payload.sub
        });
    
        user = await userService.getById(newUser._id);
    
        return {
            user: user,
            auth: createAuth(user)
        }
    }

    if(user.provider !== 'google') {
        throw new AppError('UNAUTHORIZED', 'La cuenta fue iniciada con otro servicio', true);
    }

    if(!user.isActive) {
        throw new AppError('FORBIDDEN','La cuenta no esta activa',true);
    }

    user = await updateUser(user, payload);

    return {
        user: user,
        auth: createAuth(user)
    }

}

module.exports = continueWithGoogle;