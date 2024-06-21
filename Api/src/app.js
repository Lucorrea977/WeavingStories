const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');


const passwordRoutes = require('./routes/passwordRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


app.use('/api/password', passwordRoutes);
app.use('/api/users', userRoutes);









module.exports = app;