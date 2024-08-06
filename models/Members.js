const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Member = sequelize.define('Member', { 
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'members', 
});

module.exports = Member;
