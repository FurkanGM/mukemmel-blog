const db = require('../../lib/db');

export default async (req, res) => {
  const blogs = await db.query(`
      SELECT *
      FROM articles
    `);
  await res.json({ blogs })
};
