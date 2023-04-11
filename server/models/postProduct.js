'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postProduct = new Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    groupId: {
        type: Number,
        required: true
    },
    note: {
        type: String
    },
    other: {
        type: String
    },
    price: {
        type: String
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

var postProduct = module.exports = mongoose.model('postProducts', postProduct);

module.exports.getProduct = (callback, limit) => {
    postProduct.find(callback).limit(limit);
}

module.exports.getProductById = (id, callback) => {
    postProduct.findById(id, callback);
}

module.exports.addProduct = (product, callback) => {
    postProduct.create(product, callback);
}

module.exports.updateProduct = (id, product, callback) => {
    var query = {
        _id: id
    };
    var update = {
        title: product.title,
        groupId: product.groupId,
        img: product.img,
        price: product.price,
        note: product.note,
        other: product.other
    }
    postProduct.update(query,{$set: update}, callback);
}
module.exports.removeProduct = (id, callback) => {
    var query = {
        _id: id
    };
    postProduct.remove(query, callback);
}
//mongoimport --db shops --collection shop --file data.json --jsonArray
