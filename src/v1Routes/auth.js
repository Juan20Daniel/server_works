const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { validateField } = require('../middlewares');
const userSchema = require('../schemas/auth.schame');

router.post('/register-with-email', 
    validateField(userSchema.createUserSchema),
    authController.registerWithEmail
);

router.post('/login-with-email',
    validateField(userSchema.loginSchema),
    authController.loginWithEmail
);
router.post('/google/callback', authController.authWithGoogle);

module.exports = router;
//desplegar a heroku