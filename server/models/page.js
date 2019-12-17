var Sequelize = require('sequelize');
var sequelize = require('../../lib/db');
var page = sequelize.define('pages', {
    page_id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    page_slug: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    page_img: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    page_name: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    page_title: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    page_content: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    page_date: {
        type: Sequelize.STRING,
        notEmpty: true
    }
}, {
    timestamps: false
});

module.exports = page;