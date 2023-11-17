const express = require('express');
const routes = require('./routes');
// import sequelize connection
// const sequelize = require('sequelize');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
