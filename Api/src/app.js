const express = require('express');
const cors = require('cors');
const conversationRoutes = require('./routes/conversationRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/conversations', conversationRoutes);

module.exports = app;