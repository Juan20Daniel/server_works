const { AppError } = require('../../utils/error');
const { createRemoteJWKSet, jwtVerify } = require('jose');
const { createAuth } = require('../../utils/jwt');
const userService = require('../user');

const verifyAccessToken = async (accessToken) => {
    const url = new URL('https://graph.facebook.com/debug_token');
   
    url.searchParams.append('input_token', accessToken);
    url.searchParams.append(
        'access_token',
        `${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_SECRET_KEY}`
    );
    const response = await fetch(url);
    if(!response.ok) {
        throw new AppError(
            'FACEBOOK_INVALID_TOKEN',
            'No fue posible validar el token de Facebook.',
            true
        );
    } 
   
    const { data } = await response.json();
    if(!data.is_valid) {
        throw new AppError(
            'FACEBOOK_INVALID_TOKEN',
            'El token de Facebook no es válido.',
            true
        );
    }

    if(data.app_id !== process.env.FACEBOOK_APP_ID) {
        throw new AppError(
            'FACEBOOK_INVALID_APP',
            'El token no pertenece a esta aplicación.',
        );
    }
    return data;
}

const getProfileFromAccessToken = async (accessToken) => {
    const url = new URL('https://graph.facebook.com/me');
    url.searchParams.append(
        'fields',
        'id,email,first_name,last_name,picture',
    );
    url.searchParams.append('access_token', accessToken);

    const response = await fetch(url);

    if(!response.ok) {
        throw new AppError(
            'FACEBOOK_PROFILE_REQUEST_FAILED', 
            'No fue posible obtener la información del usuario de Facebook.',
            true
        );
    }

    const data = await response.json();

    return {
        picture: data.picture.data.url,
        given_name: data.first_name,
        family_name: data.last_name,
        email: data.email,
        sub: data.id,
    }
}

const authenticateWithAccessToken = async (accessToken) => {
    await verifyAccessToken(accessToken);
    const data = await getProfileFromAccessToken(accessToken);
    return await loginOrRegister(data);
}

const verifyAuthenticationToken = async (token) => {
    try {
        const JWKS = createRemoteJWKSet(
            new URL('https://www.facebook.com/.well-known/oauth/openid/jwks/')
        );

        const { payload } = await jwtVerify(token, JWKS, {
            issuer: 'https://www.facebook.com',
            audience: process.env.FACEBOOK_APP_ID,
        });

        return {
            picture: payload.picture,
            given_name: payload.given_name,
            family_name: payload.family_name,
            email: payload.email,
            sub: payload.sub
        }
    } catch (error) {
        throw new AppError(
            'FACEBOOK_INVALID_TOKEN',
            'El token de autenticación de Facebook no es válido.',
            401,
        );
    }
}

const authenticateWithAuthenticationToken = async (token) => {
    const data = await verifyAuthenticationToken(token);
    return await loginOrRegister(data);
}

const loginOrRegister = async (profile) => {
    let [ user, emailExists ] = await Promise.all([
        userService.getByProviderId(profile.sub),
        userService.getByEmail(profile.email),
    ]);

    if(emailExists && !user) {
        throw new AppError(
            'DUPLICATE_EMAIL', 
            'El correo ya existe',
            true
        );
    }

    if(!user) {
        user = await userService.createByProvider(profile, 'facebook');
        return {
            user: user,
            auth: createAuth(user)
        }
    }

    if(user.provider !== 'facebook') {
        throw new AppError('UNAUTHORIZED', 'La cuenta fue iniciada con otro servicio', true);
    }

    if(!user.isActive) {
        throw new AppError('FORBIDDEN','La cuenta no esta activa',true);
    }

    user = await userService.updateByProvider(user, profile);

    return {
        user: user,
        auth: createAuth(user)
    }
}

const continueWithFacebook = async (tokenType, token) => {
    switch(tokenType) {
        case 'access_token':
            return await authenticateWithAccessToken(token);
        case 'authentication_token':
            return await authenticateWithAuthenticationToken(token);
        default: 
            throw new AppError(
                'INVALID_FACEBOOK_TOKEN_TYPE',
                'Tipo de token de Facebook no soportado.',
                true,
            );
    }
}

module.exports = continueWithFacebook;