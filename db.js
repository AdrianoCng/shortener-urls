const { Sequelize } = require('sequelize');

const database = process.env.DB_NAME;
const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize({
    database,
    username,
    password,
    host,
    dialect: 'mysql',
    port: 3306
});

sequelize
    .authenticate()
    .then(() => console.log('Database connected.'))
    .catch((err) => console.log('Error connecting to the database', err));

sequelize.sync();

module.exports = sequelize