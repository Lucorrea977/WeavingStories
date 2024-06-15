const express = require('express');
const {createPost, getUserPosts, updatePost, deletePost, getPostById} = require('../controllers/PostController');
const authMiddleware  = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/posts', authMiddleware, createPost);
router.get('/posts', authMiddleware, getUserPosts);
router.put('/posts/:postId', authMiddleware, updatePost);
router.delete('/posts/:postId', authMiddleware, deletePost);
router.get('/posts/:postId', authMiddleware, getPostById);

module.exports = router;