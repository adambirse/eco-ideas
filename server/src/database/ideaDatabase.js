const Sequelize = require('sequelize');

const sequelize = require('./database');

const Idea = sequelize.define('idea', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    text: Sequelize.STRING,
    category: Sequelize.STRING
});

module.exports = Idea;
