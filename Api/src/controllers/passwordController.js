const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { sendEmail } = require('../utils/email');
const { validateEmail, validatePassword } = require('../utils/validation');

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    // Validar formato de email
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Formato de correo electrónico inválido.' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.error('Usuario no encontrado para el email:', email);
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    const resetToken = jwt.sign({ email }, process.env.JWT_RESET_SECRET, { expiresIn: '1h' });

    const resetTokenExpires = new Date();
    resetTokenExpires.setHours(resetTokenExpires.getHours() + 1);

    await User.update(
      { resetToken, resetTokenExpires },
      { where: { email } }
    );

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    await sendEmail(email, 'Restablecer Contraseña', `<p>Haga clic <a href="${resetUrl}">aquí</a> para restablecer su contraseña.</p>`);

    console.log('Correo electrónico enviado para restablecer la contraseña a:', email);
    res.status(200).json({ message: 'Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña.', resetToken });
  } catch (error) {
    console.error('Error al solicitar restablecimiento de contraseña:', error.message, error.stack);
    res.status(500).json({ message: 'Error al solicitar restablecimiento de contraseña.' });
  }
}

async function resetPassword(req, res) {
  try {
    const { newPassword } = req.body;
    const { token } = req.params;

    // Validar contraseña usando la función de validación reutilizable
    if (!validatePassword(newPassword)) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres, una letra mayúscula y un número.' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
    } catch (error) {
      console.error('Error al verificar el token JWT:', error.message);
      return res.status(401).json({ message: 'Token inválido o expirado.' });
    }

    const user = await User.findOne({ where: { resetToken: token } });

    if (!user || new Date() > new Date(user.resetTokenExpires)) {
      console.error('Token de restablecimiento de contraseña inválido o expirado.');
      return res.status(400).json({ message: 'Token de restablecimiento de contraseña inválido o expirado.' });
    }

    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    await User.update(
      { passwordHash: newPasswordHash, resetToken: null, resetTokenExpires: null },
      { where: { email: user.email } }
    );

    // Enviar correo de confirmación
    await sendEmail(user.email, 'Contraseña Restablecida', `<p>Su contraseña ha sido restablecida con éxito. Si no realizó este cambio, por favor contacte al soporte de inmediato.</p>`);

    console.log('Contraseña restablecida para el usuario:', user.email);
    res.status(200).json({ message: 'Contraseña restablecida correctamente.' });
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error.message);
    res.status(500).json({ message: 'Error al restablecer la contraseña.' });
  }
}
module.exports = {
  forgotPassword,
  resetPassword,
};