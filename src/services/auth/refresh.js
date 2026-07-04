const userService = require('../user');
const { AppError } = require('../../utils/error');
const {
    verifyAndDecodeToken,
    createToken,
    createRefreshToken
} = require('../../utils/jwt');

const refresh = async (refreshToken) => {
    const verifyAndDecodeResults = await verifyAndDecodeToken(refreshToken);
    
    const user = await userService.getById(verifyAndDecodeResults.id)
    if(!user) {
        throw new AppError('NOT_FOUND', 'Cuenta no encontrada', true);
    }
    
    if(!user.isActive) {
        throw new AppError('FORBIDDEN', 'La cuenta no esta activa', true);
    }

    const newToken = createToken({
        id:user._id,
        role:user.role,
        email:user.email
    });

    const newRefreshToken = createRefreshToken(user._id);

    const auth = {
        token: newToken,
        refreshToken: newRefreshToken
    }

    return {
        user: user,
        auth: auth
    }
}

module.exports = refresh;