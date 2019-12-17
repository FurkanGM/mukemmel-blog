var Sequelize = require('sequelize');
var sequelize = require('../../lib/db');
var post = sequelize.define('articles', {
    article_id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    article_slug: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    article_img: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    article_title: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    article_description: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    article_content: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    article_category: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    article_date: {
        type: Sequelize.STRING,
        notEmpty: true
    }
}, {
    timestamps: false
});

module.exports = post;