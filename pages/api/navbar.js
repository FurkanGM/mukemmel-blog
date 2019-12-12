import React from "react";
const db = require('../../lib/db');

export default async (req, res) => {
    const navbar = await db.query(`
      SELECT *
      FROM navbar
    `);
    await res.json({ navbar })
};
