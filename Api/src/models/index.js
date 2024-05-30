const Sequelize = require('sequelize');
const sequelize = require('../db.js');

const User = require('./User')(sequelize, Sequelize);

const db = {
  User,
  sequelize,
  Sequelize,
};

module.exports = db;