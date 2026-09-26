const { AppError } = require("../utils/error");

const authorize = (authorizeRoles) => {
    return (req, res, next) => {
        const user = req.user;
        if(!authorizeRoles.includes(user.role)) {
            throw new AppError('UNAUTHORIZED', 'No autorizado', true)
        }

        next();
    }
}

module.exports = authorize;