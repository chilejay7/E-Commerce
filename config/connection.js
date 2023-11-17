// To utilize sequelize we first needs to require the module and import it as a class.
const Sequelize = require('sequelize');
require('dotenv').config();

// Sequelize is then included as a variable that creates a new Sequelize instance providing the db connection information.
// The database is synced in the server.js file.  A variable is defined in that file pointing to this configuration file.
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
