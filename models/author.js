const { DataTypes } = require('sequelize');
const sequelize = require('../getDBConnect')

// Definiera en modell för tabellen Author
const Author = sequelize.define(
  'Author',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER
    },
  },
  {
    tableName: 'Author', // Mappas till tabellen i databasen
    timestamps: false, // Om du inte har kolumner som createdAt/updatedAt
  }
);

module.exports = Author