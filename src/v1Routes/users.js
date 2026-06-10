const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const { autenticate } = require('../middlewares');

// Ruta para obtener todos los usuarios
router.get('/', (req, res) => {
    res.json({ message: 'Obtener todos los usuarios' });
});

// Ruta para obtener un usuario por ID
router.get('/:id',
    autenticate,
    userController.getUserById
);

// Ruta para crear un nuevo usuario
router.post('/', (req, res) => {
    res.json({ message: 'Crear un nuevo usuario' });
});

// Ruta para actualizar un usuario por ID
router.put('/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: `Actualizar usuario con ID: ${userId}` });
});

// Ruta para eliminar un usuario por ID
router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: `Eliminar usuario con ID: ${userId}` });
});

module.exports = router;