const { Post } = require('../models/Post');
const { User } = require('../models/User');
const { Comment } = require('../models/Comment');

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    const post = await Post.create({ title, content, userId });

    res.status(201).json({ message: 'Publicación creada correctamente.', post });
  } catch (error) {
    console.error('Error al crear publicación:', error);
    res.status(500).json({ message: 'Error al crear publicación.' });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await Post.findAll({ where: { userId } });

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error al obtener publicaciones:', error);
    res.status(500).json({ message: 'Error al obtener publicaciones.' });
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { title, content } = req.body;

    const post = await Post.findByPk(postId);
    if (!post || post.userId !== req.user.id) {
      return res.status(404).json({ message: 'Publicación no encontrada o no autorizada.' });
    }

    post.title = title;
    post.content = content;
    await post.save();

    res.status(200).json({ message: 'Publicación actualizada correctamente.', post });
  } catch (error) {
    console.error('Error al actualizar publicación:', error);
    res.status(500).json({ message: 'Error al actualizar publicación.' });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findByPk(postId);
    if (!post || post.userId !== req.user.id) {
      return res.status(404).json({ message: 'Publicación no encontrada o no autorizada.' });
    }

    await post.destroy();

    res.status(200).json({ message: 'Publicación eliminada correctamente.' });
  } catch (error) {
    console.error('Error al eliminar publicación:', error);
    res.status(500).json({ message: 'Error al eliminar publicación.' });
  }
};

const getPostById = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findByPk(postId, {
      include: [
        { model: User, as: 'author', attributes: ['username', 'profilePicture'] },
        { model: Comment, include: { model: User, as: 'author', attributes: ['username', 'profilePicture'] } }
      ]
    });

    if (!post) {
      return res.status(404).json({ message: 'Publicación no encontrada.' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error('Error al obtener publicación:', error);
    res.status(500).json({ message: 'Error al obtener publicación.' });
  }
};

module.exports = {
  createPost,
  getUserPosts,
  updatePost,
  deletePost,
  getPostById,
};
