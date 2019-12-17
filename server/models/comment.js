var Sequelize = require('sequelize');
var sequelize = require('../../lib/db');

var comment = sequelize.define('comments', {
    comment_id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    article_id: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    author_name: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    author_email: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    author_content: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    comment_date: {
        type: Sequelize.STRING,
        notEmpty: true
    },
    status: {
        type: Sequelize.INTEGER,
        notEmpty: true
    }
}, {
    timestamps: false
});

module.exports = comment;