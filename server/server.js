const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const db = require('../lib/db');
const bodyParser = require('body-parser');
const dateformat = require('dateformat');
// MODELS
const post = require('./models/post');
const page = require('./models/page');
const comment = require('./models/comment');
const navbar = require('./models/navbar');

app.prepare()
    .then(() => {
        const server = express();
        server.use(bodyParser.urlencoded({ extended: true }));
        server.use(bodyParser.json());

        db
            .authenticate()
            .then(() => {
                console.log('Successfully connected');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
                process.exit;
            });

        server.get('/api/post/:slug', (req, res) => {
            post.findOne({
                where: {
                    article_slug: req.params.slug
                },
                raw: true,
            }).then(post => {
                if (post){
                    comment.findAll({
                        where: {
                            article_id: post.article_id
                        },
                        order: [
                            ['comment_id', 'DESC']
                        ],
                        raw: true
                    }).then(comments => {
                        res.status(200).json([post,comments]);
                    })
                }else{
                    res.status(404).json({error: true});
                }
            });
        });

        server.get('/api/page/:slug', (req, res) => {
            page.findOne({
                where: {
                    page_slug: req.params.slug
                },
                raw: true,
            }).then(page => {
                if (page){
                    res.status(200).json(page);
                }else{
                    res.status(404).json({error: true});
                }
            });
        });

        server.get('/api/posts', (req, res) => {
            post.findAll({
                raw: true,
                order: [
                    ['article_id', 'DESC']
                ]
            }).then(post => {
                if (post){
                    res.status(200).json(post);
                }else{
                    res.status(404).json({error: true});
                }
            });
        });

        server.get('/api/lastposts', (req, res) => {
            post.findAll({
                limit: 5,
                raw: true,
                order: [
                    ['article_id', 'DESC']
                ]
            }).then(post => {
                if (post){
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
                    res.status(200).json(post);
                }else{
                    res.status(404).json({error: true});
                }
            });
        });

        server.get('/api/navbar', (req, res) => {
            navbar.findAll({
                raw: true,
            }).then(navbar => {
                if (navbar){
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
                    res.status(200).json(navbar);
                }else{
                    res.status(404).json({error: true});
                }
            });
        });

        server.post('/api/post/:slug/addcomment', (req,res) => {
            comment.create({
                article_id: req.body.aid,
                author_name: req.body.name,
                author_email: req.body.email,
                author_content: req.body.content,
                comment_date: dateformat(new Date(), 'dd.mm.yyyy H:MM:ss'),
                status: 1
            }).then(comment => {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
                res.status(200).send({error: "no"});
            }).catch(e => {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
                res.status(404).send(e);
            });
        });

        server.get('*', (req, res) => {
            return handle(req, res)
        });

        server.listen(80, (err) => {
            if (err) throw err;
            console.log('> Ready on 80 port')
        })
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1)
    });

