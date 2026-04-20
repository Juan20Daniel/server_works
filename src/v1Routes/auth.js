const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Ruta para iniciar sesión
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;