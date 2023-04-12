var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var posts = require('../models/posts');
var ObjectId = require('mongoose').Types.ObjectId;

var result = {
    success: {
        result: 'Successful'
    },
    fail: {
        result: 'Failed',
        reason: 'None'
    }
}

router.get('/', (req, res) => {
    posts.getPost((err, posts) => {
        if (err) {
            res.status(555).send(result.fail);
            res.end();
        }
        res.json(posts);
        res.end();
    });
});

router.post('/', (req, res) => {
    console.log("---------------------");
    console.log(req);
    console.log(req.body);
    
    var post = req.body;
    posts.addPost(post, (err, post) => {
        if (err) {
            throw err;
        }
        res.json(post);
    });
});

router.get('/:id', (req, res) => {
    var id = req.params.id;
   
    posts.getPostById(id, (err, post) => {
        if (err) {
            throw err;
        }
        res.json(post);
    });
});


router.put('/:id', (req, res) => {
    var id = req.params.id;
    var _oid = id.split(':');
    var id2 = ObjectId(_oid[1]);
    var post = req.body;
    posts.updatePost(id2, post,(err, post) => {
        if (err) {
            throw err;
        }
        res.json(post);
    });
});

router.delete('/:id', (req, res) => {
    var id = req.params.id;
    console.log(id,"id");
    var _oid = id.split(':');
    var id2 = ObjectId(_oid[1]);
    posts.removePost(id2, (err, post) => {
        if (err) {
            throw err;
        }
        res.json(post);
    });
});
module.exports = router;
