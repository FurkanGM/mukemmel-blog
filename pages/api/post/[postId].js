const db = require('../../../lib/db');

var response = [];
if (response.length > 0)
  response = [];
export default (req, res) => {
  //let sql = db.query(`SELECT * FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE article_slug = '${req.query.postId}'`);
  let sql1 = db.query(`SELECT * FROM articles where article_slug = '${req.query.postId}'`);
  let sql2 = db.query(`SELECT * FROM comments where article_id = '${req.query.postId}'`);
  var a = [];
  sql1.then(function (result) {
    if (result !== undefined) {
      a.push(result);
    }else{
      res.statusCode = 404;
      res.end('Not found');
    }
  }).catch((err) => {
    console.log(err);
  });
  sql2.then(function (result) {
    if (result !== undefined) {
      a.push(result);
      res.json(a)
    }else{
      res.statusCode = 404;
      res.end('Not found');
    }
  }).catch((err) => {
    console.log(err);
  });
};
