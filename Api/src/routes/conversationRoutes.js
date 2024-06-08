const express = require('express');
const conversationController = require('../controllers/conversationController');

const router = express.Router();

router.get('/', conversationController.getConversations);
router.post('/', conversationController.createConversation);

module.exports = router;