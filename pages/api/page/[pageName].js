const db = require('../../../lib/db');

export default (req, res) => {
  let sql = db.query(`
      SELECT *
      FROM pages
    `);
  sql.then(function (result) {
    var ans = result.find(post => post.page_slug === req.query.pageName);
    if (ans !== undefined)
      res.json({
        post: result.find(post => post.page_slug === req.query.pageName)
      });
    res.statusCode = 404;
    res.end('Not found');
  }).catch((err) => {
    console.log(err);
  });
};
