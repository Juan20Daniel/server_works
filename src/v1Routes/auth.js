const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const authSchema = require('../schemas/auth.schame');
const { validateField } = require('../middlewares');

router.post('/register-with-email', 
    validateField(authSchema.createUserSchema),
    authController.registerWithEmail
);

router.post('/login-with-email',
    validateField(authSchema.loginWihEmailSchema),
    authController.loginWithEmail
);
router.post('/continue-with-google', 
    validateField(authSchema.continueWithGoogleSchema),
    authController.continueWithGoogle
);

module.exports = router;