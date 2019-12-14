const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');


const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());

    server.post('/server', (req, res) => {
        console.log(req.body);
        const firstName = req.body.firstName;
        res.send({firstName})
    });

    server.get('*', (req, res) => {
        return handle(req, res)
    });

    server.listen(3000, (err) => {
        if (err) throw err
        console.log('> Read on http://localhost:3000')
    })
});