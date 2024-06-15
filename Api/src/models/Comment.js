
const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');


const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Comment;
