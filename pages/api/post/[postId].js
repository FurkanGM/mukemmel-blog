const db = require('../../../lib/db');


export default (req, res) => {
  let sql = db.query(`
      SELECT *
      FROM articles
    `);
  sql.then(function (result) {
    res.json({
      post: result.find(post => post.article_slug === req.query.postId)
    })
  }).catch((err) => {
    console.log(err);
  });
};
