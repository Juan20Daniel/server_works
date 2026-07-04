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
        const formatToken = token.split(' ')[1];
       
        return jwt.verify(formatToken, process.env.SECRET_KEY);
    } catch (error) {
        throw new AppError('UNAUTHORIZED', 'El token no es válido', true);
    }
}

module.exports = {
    createToken,
    createRefreshToken,
    verifyAndDecodeToken
}