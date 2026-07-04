const User = require("../../models/User");
const { AppError } = require("../../utils/error");
const { createToken, createRefreshToken } = require("../../utils/jwt");
const { encryptPassword } = require("../../utils/password");
const avatarColor = require('../../utils/avatarColor');
const userService = require('../user');

const registerWithEmail = async (data) => {
    const { firstname, lastname, email, password } = data;
    
    const emailExists = await userService.getByEmail(email);

    if(emailExists) {
        throw new AppError('DUPLICATE_EMAIL', 'El correo ya existe', true);
    }

    const passwordEncrypted = encryptPassword(password);

    const newUser = await User.create({
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:passwordEncrypted,
        avatarColor: avatarColor()
    });
    
    const token = createToken({
        id:newUser._id, 
        role:newUser.role,
        email:newUser.email
    });

    const refreshToken = createRefreshToken(newUser._id);
    const auth = {
        token: token,
        refreshToken: refreshToken
    }

    const user = await userService.getById(newUser._id);

    return {
        user,
        auth
    };
}

module.exports = registerWithEmail;