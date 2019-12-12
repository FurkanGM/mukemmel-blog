const db = require('../../../lib/db');


export default (req, res) => {
  let sql = db.query(`
      SELECT *
      FROM articles
    `);
  sql.then(function (result) {
    var ans = result.find(post => post.article_slug === req.query.postId);
    if (ans !== undefined)
      res.json({
        post: result.find(post => post.article_slug === req.query.postId)
      });
    res.statusCode = 404;
    res.end('Not found');
  }).catch((err) => {
    console.log(err);
  });
};
