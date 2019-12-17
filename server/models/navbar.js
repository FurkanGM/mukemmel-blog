var Sequelize = require('sequelize');
var sequelize = require('../../lib/db');
var navbar = sequelize.define('navbars', {
    navbar_id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    navbar_text: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    navbar_link: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    navbar_alt: {
        type: Sequelize.STRING,
        notEmpty: true
    }
}, {
    timestamps: false
});

module.exports = navbar;