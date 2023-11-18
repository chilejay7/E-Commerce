# E-Commerce Sequelize Application

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Description

The E-Commerce application helps end users manage products and their associated tags and categories.  This is done through a database connection that leverages the `Sequelize` package.  Routes have been defined for products, categories, and tags.  All routes query the database and return the requested information.  A general `GET` request can be made to the root of each route or more specific `GET` queries can be performed through the use of the item's id.  `POST`, `PUT`, and `DELETE` functionality has also been defined within the respective routes.

![E-Commerce](./assets/images/RegionalMgr.gif)

## Table of Contents 

- [Installation](#installation)  
- [Usage](#usage)  
- [License](#license)
- [Questions](#questions)  
      
    
## Installation

The application can be installed by cloning the repository to your local machine.  Please note, Node.js is required in order to run this application and will need to be installed before attempting to run the program.  The package dependencies are included within the package.json file and can be installed through a simple `npm i` command once the repository has been successfully cloned on the local computer.  The `sequelize`, `dotenv`, `express`, and `mysql2` modules are required for this application to run correctly and must be installed prior to running the program.  The `schema.sql` file will create the database when sourced through mysql.  The seeds can be created through node using the `node ./seeds/index.js` command.

## Usage

The application is initialized by running the `node server.js` command through the terminal.  When the `server.js` file is called, it syncs the database through sequelize and starts the express application, listening on port 3001.  Rquests can be sent to the application using the routes defined within the `routes/api` directory using the following syntax: `localhost:3001/api/<route name>`.  The routes that can be queried are: `api/products`, `api/categories`, and `api/tags`.  Requests can be sent through an application such as Insomnia or Postman to retrieve product related data from the database.  Each endpoint has a `GET`, `POST`, `PUT`, and `DELETE` endpoint defined.  The `GET` endpoint will use a `SELECT * FROM <table name>` query if no id is specified.  If an id is given as an additional parameter through the GET request, the individual record pertaining to that id will be retrieved.

A link to the video demonstrating the application's use can be found here: [Walk-through Video]()

## License

This application is covered under the license linked below.  For further information regarding the license and its terms, please consult the official licensing documentation using the provided link.

[License: MIT](https://opensource.org/licenses/MIT)

## Contributions

No additional contributions were received from other sources for the completion of this project.

## Questions
  
GitHub: [chilejay7](https://github.com/chilejay7?tab=repositories)  
Email: codyburk7@gmail.com

