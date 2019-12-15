const db = require('../../lib/db');

export default async (req, res) => {
  const limit = parseInt(req.query.limit);
  const posts = await db.query(`
      SELECT *
      FROM articles
      LIMIT 5
    `);
  res.json({ posts })
};
