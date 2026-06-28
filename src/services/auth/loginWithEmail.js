const User = require("../../models/User");
const { AppError } = require("../../utils/error");
const { createToken, createRefreshToken } = require("../../utils/jwt");
const { comparePasswords } = require("../../utils/password");
const userService = require('../user');

const loginWithEmail = async (email, password) => {
    const fields = "email password isActive provider";
    const user = await User.findOne({email}).select(fields);
    if(!user) {
        throw new AppError('UNAUTHORIZED', 'Usuario o contraseña incorrectos', true);
    }

    if(user.provider) {
        throw new AppError('UNAUTHORIZED', 'Usuario o contraseña incorrectos', true);
    }

    const isPasswordOk = await comparePasswords(password, user.password);
    if(!isPasswordOk) {
        throw new AppError('UNAUTHORIZED', 'Usuario o contraseña incorrectos', true);
    }

    if(!user.isActive) {
        throw new AppError('FORBIDDEN', 'La cuenta no esta activa', true);
    }

    const userAutenticated = await userService.getById(user._id);

    const token = createToken({id:userAutenticated._id, role:userAutenticated.role});

    const refreshToken = createRefreshToken(userAutenticated._id);
    const auth = {
        token:`Bearer ${token}`,
        refreshToken: `Bearer ${refreshToken}`
    }

    return {
        user: userAutenticated,
        auth: auth
    };
}

module.exports = loginWithEmail;