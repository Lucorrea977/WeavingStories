const axios = require('axios');
const bcrypt = require('bcryptjs');

exports.changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    // Realizar una solicitud HTTP para buscar al usuario por su correo electrónico
    const response = await axios.post('http://localhost:3000/api/auth/find', { email });
    const user = response.data.user;

    // Verificar si el usuario existe y si la contraseña anterior es correcta
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generar un hash para la nueva contraseña y guardarla en la base de datos
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;

    // Realizar una solicitud HTTP para actualizar la contraseña del usuario
    await axios.post('http://localhost:3000/api/auth/update-password', { id: user.id, password: hashedPassword });

    // Responder con un mensaje de éxito
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    // Manejar los errores
    res.status(500).json({ error: 'Server error' });
  }
};