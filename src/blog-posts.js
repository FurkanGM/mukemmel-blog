const db = require('../lib/db');
const escape = require('sql-template-strings');

export const getPosts = () => {
    let a = db.query(`
      SELECT *
      FROM articles
      ORDER BY article_id
      LIMIT 5
    `);

    console.log(a);
    let page = 1;
    const limit = 9;
    if (page < 1) page = 1;
    const articles = db.query(escape`
      SELECT *
      FROM articles
      ORDER BY article_id
      LIMIT 5
    `);
};