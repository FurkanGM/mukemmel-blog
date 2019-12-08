const db = require('../../lib/db');

export default async (req, res) => {
  const limit = parseInt(req.query.limit);
  const blogs = await db.query(`
      SELECT *
      FROM articles
    `);
  res.json({ blogs })
};
