var Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'Pvcy5foFeo',
    'Pvcy5foFeo',
    'FrBdN2Uezg',
    {
        host: 'remotemysql.com',
        dialect: 'mysql',
        logging: false
    }
);

module.exports = sequelize;