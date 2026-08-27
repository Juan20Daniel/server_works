const jwt = require('jsonwebtoken');
const { AppError } = require('./error');

const createToken = (data) => {
    return jwt.sign(data, process.env.SECRET_KEY, {expiresIn:60*60*24});
}

const createRefreshToken = (userId) => {
    return jwt.sign({id:userId}, process.env.SECRET_KEY, {expiresIn:86400*7})
}

const verifyAndDecodeToken = (token) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        throw new AppError('UNAUTHORIZED', 'El token no es válido', true);
    }
}

const createAuth = (user) => {
    const token = createToken({
        id:user._id, 
        role:user.role,
        email:user.email
    });
    const refreshToken = createRefreshToken(user._id);
    const auth = {
        token: token,
        refreshToken: refreshToken
    }

    return auth;
}

module.exports = {
    createToken,
    createRefreshToken,
    verifyAndDecodeToken,
    createAuth
}