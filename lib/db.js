const mysql = require('serverless-mysql');

const db = mysql({
    config: {
        host: "remotemysql.com",
        database: "Pvcy5foFeo",
        user: "Pvcy5foFeo",
        password: "FrBdN2Uezg"
    }
});

exports.query = async query => {
    try {
        const results = await db.query(query);
        await db.end();
        return results
    } catch (error) {
        return { error }
    }
};