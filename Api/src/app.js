const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

// Middleware para manejar solicitudes JSON y formularios
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

// Middleware para registrar las solicitudes HTTP en la consola
app.use(morgan('dev'));

// Middleware para permitir solicitudes de origen cruzado (CORS)
app.use(cors());

// Rutas de autenticación y de usuario
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

module.exports = app;