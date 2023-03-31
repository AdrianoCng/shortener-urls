const { DataTypes } = require('sequelize');
const sequilize = require('../db');

const Url = sequilize.define('Url', {
    urlID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    originalUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shortUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});


module.exports = Url;