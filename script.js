//const mysql = require('mysql');
//const { Sequelize, DataTypes } = require('sequelize');
//const User = require('./user')
//const sequelize = require('./getDBConnect')
const { createUser, getAllUsers } = require('./dbService');
const syncDatabase = require('./syncDatabase');






/*
// Steg 4: CRUD-funktioner
async function createUser(name, email) {
  try {
    const user = await User.create({ name, email });
    console.log('Ny användare skapad:', user.toJSON());
  } catch (error) {
    console.error('Fel vid skapande av användare:', error.message);
  }
}

async function getAllUsers() {
  try {
    const users = await User.findAll();
    console.log('Alla användare:', users.map((u) => u.toJSON()));
  } catch (error) {
    console.error('Fel vid hämtning av användare:', error.message);
  }
}
*/
// Steg 5: Kör exempel
(async () => {
  await syncDatabase();

  // Skapa en ny användare
  let user = await createUser('Number21', 'Nr22@example.com');
  console.log('Ny användare skapad:', user.toJSON());

  // Hämta alla användare
  let users = await getAllUsers();
  console.log('Alla användare:', users.map((u) => u.toJSON()));
})();
