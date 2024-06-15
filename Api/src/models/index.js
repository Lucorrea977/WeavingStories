'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const sequelize = require('../database/connection'); // Importar sequelize desde connection.js
const db = {};

// Leer todos los archivos de modelos y configurarlos
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Definir las relaciones entre los modelos
const { User, Post, Comment } = sequelize.models;

// Relaciones
User.hasMany(Post, { foreignKey: 'userId' });
User.hasMany(Comment, { foreignKey: 'userId' });

Post.belongsTo(User, { foreignKey: 'userId' });
Post.hasMany(Comment, { foreignKey: 'postId' });

Comment.belongsTo(User, { as: 'author', foreignKey: 'userId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

// Asociar todos los modelos si tienen el método associate definido
Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

// Agregar Sequelize y la instancia de sequelize al objeto db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Exportar el objeto db que contiene todos los modelos y la instancia de Sequelize
module.exports = db;
