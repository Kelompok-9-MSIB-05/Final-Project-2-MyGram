// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'postgre',
  password: 'ngabol123',
  database: 'postgre',
});

module.exports = { sequelize };
