
// passwordRoutes.js
const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');

// Ruta para solicitar restablecimiento de contraseña
router.post('/forgot-password', passwordController.forgotPassword);

// Ruta para restablecer la contraseña
router.post('/reset-password/:token', passwordController.resetPassword);

module.exports = router;
