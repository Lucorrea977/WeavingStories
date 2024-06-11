const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para el registro de usuarios
router.post('/register', userController.registerUser);

// Ruta para iniciar sesión
router.post('/login', userController.loginUser);

module.exports = router;