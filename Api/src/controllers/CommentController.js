
const {Comment} = require('../models/Comment');
const {Post} = require('../models/Post');

const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Publicación no encontrada.' });
    }

    const comment = await Comment.create({ content, userId, postId });

    res.status(201).json({ message: 'Comentario creado correctamente.', comment });
  } catch (error) {
    console.error('Error al crear comentario:', error);
    res.status(500).json({ message: 'Error al crear comentario.' });
  }
};

const updateComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { content } = req.body;

    const comment = await Comment.findByPk(commentId);
    if (!comment || comment.userId !== req.user.id) {
      return res.status(404).json({ message: 'Comentario no encontrado o no autorizado.' });
    }

    comment.content = content;
    await comment.save();

    res.status(200).json({ message: 'Comentario actualizado correctamente.', comment });
  } catch (error) {
    console.error('Error al actualizar comentario:', error);
    res.status(500).json({ message: 'Error al actualizar comentario.' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const comment = await Comment.findByPk(commentId);
    if (!comment || comment.userId !== req.user.id) {
      return res.status(404).json({ message: 'Comentario no encontrado o no autorizado.' });
    }

    await comment.destroy();

    res.status(200).json({ message: 'Comentario eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    res.status(500).json({ message: 'Error al eliminar comentario.' });
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
