const { DataTypes } = require('sequelize');
const sequilize = require('../db');

const Url = sequilize.define('Url', {
    urlID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    originalUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    shortUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    clicks: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    }
});

Url.pr


module.exports = Url;