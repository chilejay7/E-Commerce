const express = require('express');
const routes = require('./routes');
// import sequelize connection

// The const needs to be defined by importing the sequelize connection that creates a new instance of the class and includes
// the db connection information contained in the file specified.
const sequelize = require('./config/connection');

// Initializes the express application.
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This imports the routes from the directory by the same name.
app.use(routes);

// sync sequelize models to the database, then turn on the server
// The ({force: false}) option means that Sequelize won't drop tables and recreate them if they already exist.
// This is similar to the DROP IF EXISTS option used in SQL.
sequelize.sync({force: false})
.then(() => {
  app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  });
});
