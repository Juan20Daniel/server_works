const { AppError } = require('../../utils/error');
const { createAuth } = require('../../utils/jwt');
const { OAuth2Client } = require('google-auth-library');
const userService = require('../user');

const client = new OAuth2Client();

const continueWithGoogle = async (accessToken) => {
    const ticket = await client.verifyIdToken({
        idToken: accessToken,
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
        throw new AppError(
            'DUPLICATE_EMAIL', 
            'El correo ya existe',
            true
        );
    }
    if(!user) {
        user = await userService.createByProvider(profile, 'google');
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
    user = await userService.updateByProvider(user, payload);
    return {
        user: user,
        auth: createAuth(user)
    }
}

module.exports = continueWithGoogle;