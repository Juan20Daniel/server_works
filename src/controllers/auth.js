const authService = require('../services/auth');
const asyncHandler = require('../utils/asyncHandler');

const registerWithEmail = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    const {user, auth} = await authService.registerWithEmail({
        firstname,
        lastname,
        email,
        password
    });

    res.status(201).json({
        message:'Usuario registrado',
        user,
        auth,
    });
});

const loginWithEmail = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    const { user, auth } = await authService.loginWithEmail(email, password);

    res.status(201).json({
        message:"Sesión iniciada",
        auth,
        user
    });
})

const continueWithGoogle = async (req, res, next) => {
    const { idToken } = req.body;

   const result = await authService.continueWithGoogle(idToken);

    res.status(201).json({
        message:"Sesión iniciada",
        ...result
    });
}

module.exports = {
    registerWithEmail,
    loginWithEmail,
    continueWithGoogle,
}