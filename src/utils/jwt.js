const jwt = require('jsonwebtoken');

const createToken = (data) => {
    return jwt.sign(data, process.env.SECRET_KEY, {expiresIn:60*60*24});
}

const createRefreshToken = (userId) => {
    return jwt.sign({id:userId}, process.env.SECRET_KEY, {expiresIn:86400*7})
}


const verifyAndDecodeToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
}

module.exports = {
    createToken,
    createRefreshToken,
    verifyAndDecodeToken
}