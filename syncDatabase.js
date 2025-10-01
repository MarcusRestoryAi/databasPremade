const sequelize = require('./getDBConnect')

// Steg 3: Funktion för att synkronisera modellen
async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Sequelize-anslutning lyckades!');
    await sequelize.sync({ force: false }); // Skapar tabellen om den inte finns
    console.log('Modellen synkroniserades!');
  } catch (error) {
    console.error('Kunde inte synkronisera modellen:', error);
  }
}

module.exports = syncDatabase