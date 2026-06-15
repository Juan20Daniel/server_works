const { AppError } = require('../utils/error');
const User = require('../models/User');
const { encryptPassword, comparePasswords } = require('../utils/password');
const { createToken, createRefreshToken, verifyAndDecodeToken } = require('../utils/jwt');
const userService = require('./user');

const register = async (data) => {
    const { firstname, lastname, email, password } = data;
    
    const emailExists = await User.findOne({email}).select('email');

    if(emailExists) {
        throw new AppError('DUPLICATE_EMAIL', 'El correo ya existe',true);
    }

    const passwordEncrypted = encryptPassword(password);

    const newUser = await User.create({
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:passwordEncrypted
    });
    
    const token = createToken({id:newUser._id, role:newUser.role});

    const refreshToken = createRefreshToken(newUser._id);
    const auth = {
        token:`Bearer ${token}`,
        refreshToken: `Bearer ${refreshToken}`
    }

    const user = await userService.getById(newUser._id);

    return {
        user,
        auth
    };
}

const login = async (email, password) => {
    const fields = "email password isActive";
    const user = await User.findOne({email}).select(fields);
    if(!user) {
        throw new AppError('UNAUTHORIZED','Usuario o contraseña incorrectos',true);
    }

    const isPasswordOk = await comparePasswords(password, user.password);
    if(!isPasswordOk) {
        throw new AppError('UNAUTHORIZED','Usuario o contraseña incorrectos',true);
    }

    if(!user.isActive) {
        throw new AppError('FORBIDDEN','La cuenta no esta activa',true);
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

module.exports = {
    register,
    login
}