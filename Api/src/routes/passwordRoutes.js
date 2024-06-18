
// passwordRoutes.js
const express = require('express');
const router = express.Router();
const PasswordController = require('../controllers/PasswordController');

// Ruta para solicitar restablecimiento de contraseña
router.post('/forgot-password', PasswordController.forgotPassword);

// Ruta para restablecer la contraseña
router.post('/reset-password/:token', PasswordController.resetPassword);

module.exports = router;
