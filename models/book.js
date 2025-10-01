const { DataTypes } = require('sequelize');
const sequelize = require('../getDBConnect')

// Definiera en modell för tabellen Books
const Book = sequelize.define(
  'Book',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  {
    tableName: 'Books', // Mappas till tabellen i databasen
    timestamps: false, // Om du inte har kolumner som createdAt/updatedAt
  }
);

//One book belongs to one author
//One author can have many books
Book.belongsTo(require('./author'), { foreignKey: 'authorId' });

module.exports = Book