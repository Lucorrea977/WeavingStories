const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.use('/api/users', authRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
