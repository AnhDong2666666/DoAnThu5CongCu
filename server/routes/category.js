var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var categories = require('../models/categories');
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
    categories.getCategory((err, categories) => {
        if (err) {
            res.status(555).send(result.fail);
            res.end();
        }
        res.json(categories);
        res.end();
    });
});

router.post('/', (req, res) => {
    var category = req.body;
    categories.addCategory(category, (err, category) => {
        if (err) {
            throw err;
        }
        res.json(category);
    });
});

 router.get('/:id', (req, res) => {
     var id = req.params.id;
     console.log(id);
    //  var id2 = id.split(':');
    //  console.log(id2,"id");
     categories.getCategoryById(id, (err, category) => {
         if (err) {
             throw err;
         }
         res.json(category);
     });
 });

 router.get('/page/:pageId', (req, res) => {
    var id = req.params.pageId;
    console.log(id);
   //  var id2 = id.split(':');
   //  console.log(id2,"id");
    categories.getCategoryByPageId(id, (err, category) => {
        if (err) {
            throw err;
        }
        res.json(category);
    });
});

router.put('/:id', (req, res) => {
    var id = req.params.id;
    var _oid = id.split(':');
    var id2 = ObjectId(_oid[1]);
    var category = req.body;
    categories.updateCategory(id2, category,(err, category) => {
        if (err) {
            throw err;
        }
        res.json(category);
    });
});

router.delete('/:id', (req, res) => {
    var id = req.params.id;
    console.log(id,"id");
    var _oid = id.split(':');
    var id2 = ObjectId(_oid[1]);
    categories.removeCategory(id2, (err, category) => {
        if (err) {
            throw err;
        }
        res.json(category);
    });
});
module.exports = router;
