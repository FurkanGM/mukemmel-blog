import React from "react";
const db = require('../../lib/db');

export default async (req, res) => {
    const navbar = await db.query(`
      SELECT *
      FROM navbar
    `);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    await res.json({ navbar })
};
