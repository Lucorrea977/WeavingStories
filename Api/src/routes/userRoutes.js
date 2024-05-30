const express = require('express');
const { changePassword } = require('../controllers/userController');

const router = express.Router();

router.post('/change-password', changePassword);

module.exports = router;
