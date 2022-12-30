const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('toughts', 'root', 'crisroot', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('we connect the database');   
} catch (error) {
    console.log(`could not connect to database:${error}`);
};

module.exports = sequelize;