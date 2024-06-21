'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const sequelize = require('../database/connection'); // Importar sequelize desde connection.js
const db = {};

// Leer todos los archivos de modelos y configurarlos
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, require('sequelize').DataTypes);
    db[model.name] = model;
  });

// Agregar Sequelize y la instancia de sequelize al objeto db
db.sequelize = sequelize;
db.Sequelize = require('sequelize');

module.exports = db;