const jwt = require('jsonwebtoken');
require('dotenv').config();
const axios = require('axios');

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
    const token = generateToken(response.data.user); // Generar token JWT
    res.json({ ...response.data, token }); // Enviar token junto con los datos de usuario
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await axios.post('http://localhost:3000/api/auth/register', { email, password });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
};