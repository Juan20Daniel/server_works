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
});

const continueWithGoogle = asyncHandler(async (req, res) => {
    const { accessToken } = req.body;

   const result = await authService.continueWithGoogle(accessToken);

    res.status(201).json({
        message:"Sesión iniciada",
        ...result
    });
});

const continueWithFacebook = asyncHandler(async (req, res) => {
    const { token, tokenType } = req.body;

   authService.continueWithFacebook(tokenType, token);

    res.status(201).json({
        message:"Sesión iniciada",
    });
});

const refresh = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
   
    const result = await authService.refresh(refreshToken);
    
    res.status(201).json({
        message:"Sesión actializada",
        ...result

    });
});

module.exports = {
    registerWithEmail,
    loginWithEmail,
    continueWithGoogle,
    continueWithFacebook,
    refresh
}