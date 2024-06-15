const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const postRoutes = require('./routes/postRoutes');
const passwordRoutes = require('./routes/passwordRoutes');
const commentRoutes = require('./routes/commentRoutes');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/api/comments', commentRoutes); 
app.use('/api/password', passwordRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/users', userRoutes);









module.exports = app;
