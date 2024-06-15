const { User } = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    res.status(500).json({ message: 'Error al obtener el perfil.' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { profilePicture, description, info } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    user.profilePicture = profilePicture;
    user.description = description;
    user.info = info;
    await user.save();

    res.status(200).json({ message: 'Perfil actualizado correctamente.', user });
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    res.status(500).json({ message: 'Error al actualizar el perfil.' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
