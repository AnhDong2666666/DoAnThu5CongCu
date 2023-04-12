var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var postProduct = require('../models/postProduct');
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
    postProduct.getProduct((err, products) => {
        if (err) {
            res.status(555).send(result.fail);
            res.end();
        }
        res.json(products);
        res.end();
    });
});

 router.get('/:id', (req, res) => {
     var id = req.params.id;
     var id2 = id.split(':');
     console.log(id,"id");
     postProduct.find({
         groupId: id2
     }, (err, product) => {
         if (err) {
             throw err;
         }
         res.json(product);
     });
 });

router.post('/', (req, res) => {
    var product = req.body;
    postProduct.addProduct(product, (err, product) => {
        if (err) {
            throw err;
        }
        res.json(product);
    });
});

router.put('/:id', (req, res) => {
    var id = req.params.id;
    var _oid = id.split(':');
    var id2 = ObjectId(_oid[1]);
    var product = req.body;
    postProduct.updateProduct(id2, product,(err, product) => {
        if (err) {
            throw err;
        }
        res.json(product);
    });
});

router.delete('/:id', (req, res) => {
    var id = req.params.id;
    console.log(id,"id");
    var _oid = id.split(':');
    var id2 = ObjectId(_oid[1]);
    postProduct.removeProduct(id2, (err, product) => {
        if (err) {
            throw err;
        }
        res.json(product);
    });
});
module.exports = router;
