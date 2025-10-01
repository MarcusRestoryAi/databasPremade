const { Sequelize } = require('sequelize');
require('dotenv').config({ path: 'dbLogin.env' });

//Setup Sequelize
const sequelize = new Sequelize({
  database: process.env.DB_NAME, // Namnet på databasen
  username: process.env.DB_USER, // Användarnamn för databasen
  password: process.env.DB_PASSWORD, // Lösenord för databasen
  host: process.env.DB_HOST, // Databasens host
  dialect: process.env.DB_DIALECT, // Specificerar vilken databas vi jobbar med
});

module.exports = sequelize