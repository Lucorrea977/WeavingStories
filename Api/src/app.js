const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Importa las rutas de usuario

const passwordRoutes = require('./routes/passwordRoutes')
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/password', passwordRoutes);

module.exports = app;