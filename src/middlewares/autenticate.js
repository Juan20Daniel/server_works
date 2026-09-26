const { AppError } = require("../utils/error");
const { verifyAndDecodeToken } = require('../utils/jwt');

const autenticate = (req, res, next) => {
    if(!req.headers['authorization']) {
        return next(new AppError(
            'UNAUTHORIZED',
            'No autorizado',
            true
        ));
    }

    const token = req.headers['authorization'].split(' ')[1];

    const payload = verifyAndDecodeToken(token);
    
    req.user = payload;
    
    next();
}

module.exports = autenticate;
