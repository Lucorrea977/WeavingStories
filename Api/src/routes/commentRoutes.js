const express = require('express');
const { createComment, updateComment, deleteComment } = require('../controllers/CommentController');
const authMiddleware= require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/posts/:postId/comments', authMiddleware, createComment);
router.put('/comments/:commentId', authMiddleware, updateComment);
router.delete('/comments/:commentId', authMiddleware, deleteComment);

module.exports = router;
