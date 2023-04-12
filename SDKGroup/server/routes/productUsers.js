var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var productUsers = require('../models/productUsers');
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
    productUsers.getProduct((err, productUsers) => {
        if (err) {
            res.status(555).send(result.fail);
            res.end();
        }
        res.json(productUsers);
        res.end();
    });
});

router.get('/:id', (req, res) => {
    var id = req.params.id;
    var _oid = id.split(':');
    var id2 = ObjectId(_oid[1]);
    productUsers.find({
        idUser: id2
    }, (err, product) => {
        if (err) {
            throw err;
        }
        res.json(product);
    });
});


router.post('/', (req, res) => {
    var product = req.body;
    productUsers.addProduct(product, (err, product) => {
        if (err) {
            throw err;
        }
        res.json(product);
    });
});

router.put('/:id', (req, res) => {
    var id = req.params._id;
    var product = req.body;
    productUsers.updateproductUsers(id, product, (err, product) => {
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
    productUsers.removeProductUser(id2, (err, product) => {
        if (err) {
            throw err;
        }
        res.json(product);
    });
});
module.exports = router;
