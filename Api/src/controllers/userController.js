const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../models/User');
const { validateEmail, validatePassword}= require ('../utils/validation');

  async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // Validar campos obligatorios y formato de email
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Por favor complete todos los campos.' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Formato de correo electrónico inválido.' });
    }

    // Validar contraseña usando la función de validación reutilizable
    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres, una letra mayúscula y un número.' });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
    }

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const newUser = await User.create({
      username,
      email,
      passwordHash
    });

    res.status(201).json({ message: 'Usuario registrado correctamente.', user: newUser });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario.' });
  }
}





async function loginUser(req, res) {
  try {
    const { identifier, password } = req.body;
    console.log('Datos recibidos en loginUser:', { identifier, password });
    
    // Verificar si el usuario existe por correo electrónico o nombre de usuario
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: identifier },
          { username: identifier }
        ]
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta.' });
    }

    // Generar token de autenticación
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Inicio de sesión exitoso.', token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión.' });
  }
}


module.exports = {
  registerUser,
  loginUser,
  
};