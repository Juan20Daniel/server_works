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
    // const
    console.log(verifyAndDecodeToken(token));
   
    next();
}

module.exports = autenticate;
