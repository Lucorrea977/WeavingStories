const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function forgotPassword(req, res) {
    try {
      const { email } = req.body;
  
      // Verificar si el usuario existe
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
  
      // Generar un token de restablecimiento de contraseña y guardarlo en la base de datos
      const resetToken = jwt.sign({ email }, process.env.JWT_RESET_SECRET, { expiresIn: '1h' }); // Aquí se pasa la variable de entorno JWT_RESET_SECRET
      await User.update({ resetToken }, { where: { email } });
  
      // Aquí deberías enviar un correo electrónico al usuario con un enlace para restablecer la contraseña, que incluya el token de restablecimiento
      // Por ahora, solo respondemos con un mensaje de éxito y el token de restablecimiento para fines de demostración
      res.status(200).json({ message: 'Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña.', resetToken });
    } catch (error) {
      console.error('Error al solicitar restablecimiento de contraseña:', error);
      res.status(500).json({ message: 'Error al solicitar restablecimiento de contraseña.' });
    }
  }
  

  async function resetPassword(req, res) {
    try {
      const { email, newPassword, resetToken } = req.body;
  
      // Verificar si el usuario existe
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
  
      // Verificar si el token de restablecimiento es válido
      jwt.verify(resetToken, process.env.JWT_RESET_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Token de restablecimiento de contraseña inválido.' });
        }
  
        // Hash de la nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const newPasswordHash = await bcrypt.hash(newPassword, salt);
  
        // Actualizar la contraseña
        await User.update({ passwordHash: newPasswordHash, resetToken: null }, { where: { email } });
  
        // Responder con un mensaje de éxito
        res.status(200).json({ message: 'Contraseña restablecida correctamente.' });
      });
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      res.status(500).json({ message: 'Error al restablecer la contraseña.' });
    }
  }
module.exports = {
  forgotPassword,
  resetPassword,
};
