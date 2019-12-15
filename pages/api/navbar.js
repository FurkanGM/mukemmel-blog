import React from "react";
const db = require('../../lib/db');

export default async (req, res) => {
    const navbar = await db.query(`
      SELECT *
      FROM navbar
    `);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    await res.json({ navbar })
};
