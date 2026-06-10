const authService = require('../services/auth');
const asyncHandler = require('../utils/asyncHandler');

const registerWithEmail = asyncHandler(async (req, res) => {
    const { firstname, lastname, phone, email, password } = req.body;

    const {user, auth} = await authService.register({
        firstname, 
        lastname, 
        phone, 
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
    
    const { user, auth } = await authService.login(email, password);

    res.status(201).json({
        message:"Sesión iniciada",
        auth,
        user
    });
})

const authWithGoogle = (req, res, next) => {
    const { code } = req.query;
}

module.exports = {
    registerWithEmail,
    loginWithEmail,
    authWithGoogle,
}