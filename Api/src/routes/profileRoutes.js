
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/ProfileController'); // Asegúrate de que la ruta sea correcta
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, ProfileController.getProfile); // Verifica que getProfile esté correctamente definido
router.put('/', authMiddleware, ProfileController.updateProfile); // Verifica que updateProfile esté correctamente definido

module.exports = router;
