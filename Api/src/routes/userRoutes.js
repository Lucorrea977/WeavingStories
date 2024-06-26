
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Ruta para el registro de usuarios
router.post('/register', UserController.registerUser);

// Ruta para iniciar sesión
router.post('/login', UserController.loginUser);

module.exports = router;