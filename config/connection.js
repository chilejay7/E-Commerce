// To utilize sequelize we first needs to require the module and import it as a class.
const Sequelize = require('sequelize');
require('dotenv').config();

// Sequelize is then included as a variable that creates a new Sequelize instance providing the db connection information.
// The database is synced in the server.js file.  A variable is defined in that file pointing to this configuration file.  The environment variable file
// is included in the root of the application and is included in the .gitignore file.
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

// The database connection exported through sequelize is imported in the models files where the tables / sequelize models are defined.  It is also imported in the main
// server.js file.
module.exports = sequelize;
