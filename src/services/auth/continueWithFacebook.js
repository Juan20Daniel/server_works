const { AppError } = require('../../utils/error');
const { createRemoteJWKSet, jwtVerify } = require('jose');

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
        console.log(data);
        throw new AppError(
            'FACEBOOK_INVALID_TOKEN',
            'El token de Facebook no es válido.',
            true
        );
    }

    if(data.app_id !== process.env.FACEBOOK_APP_ID) {
        console.log({app_id:process.env.FACEBOOK_APP_ID})
        throw new AppError(
            'FACEBOOK_INVALID_APP',
            'El token no pertenece a esta aplicación.',
        );
    }
    // console.log(data);
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

    return data;
}

const authenticateWithAccessToken = async (accessToken) => {
    await verifyAccessToken(accessToken);
    await getProfileFromAccessToken(accessToken);
    return true
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

        console.log(payload);
    } catch (error) {
        throw new AppError(
            'FACEBOOK_INVALID_TOKEN',
            'El token de autenticación de Facebook no es válido.',
            401,
        );
    }
}

const authenticateWithAuthenticationToken = async (token) => {
    await verifyAuthenticationToken(token);
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