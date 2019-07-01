const Sequelize = require('sequelize');
import 'dotenv/config';

const port = process.env.DATABASE_PORT || 3306;
const host = process.env.DATABASE_HOST || 'localhost';
const databaseName = process.env.DATABASE_NAME || 'database';
const databaseUser = process.env.DATABASE_USER || 'root';
const databasePassword = process.env.DATABASE_PASSWORD || 'password';


const sequelize = new Sequelize(databaseName, databaseUser, databasePassword, {
    dialect: 'mysql',
    host: host,
    port: process.env.DATABASE_PORT
});

module.exports = sequelize;
