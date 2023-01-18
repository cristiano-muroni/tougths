const { Sequelize } = require('sequelize');

require('dotenv').config();
const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('we connect the database');   
} catch (error) {
    console.log(`could not connect to database:${error}`);
};

module.exports = sequelize;