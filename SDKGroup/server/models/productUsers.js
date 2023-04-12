'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Orders = new Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    username: {
        type:String
    },
    phone: {
        type:String
    },
    address: {
        type:String
    },
    status: {
        type: Number,
        default: 1
    },
    product: [],
    create_date: {
        type: Date,
        default: Date.now
    }
});

var productUsers = module.exports = mongoose.model('Orders', Orders);

module.exports.getProduct = (callback, limit) => {
    productUsers.find(callback).limit(limit);
}

// module.exports.getProductById = (id, callback) => {
//
//     productUsers.find({'idUser': ObjectId("id")}, callback);
// }

module.exports.addProduct = (product, callback) => {
    productUsers.create(product, callback);
}

module.exports.updateproductUsers = (id, product, callback) => {
    var query = {
        _id: id
    };
    var update = {
        status: product.status.id
    }
    productUsers.update(query,{$set: update}, callback);
}

module.exports.removeProductUser = (id, callback) => {
    var query = {
        _id: id
    };
    productUsers.remove(query, callback);
}
//mongoimport --db shops --collection shop --file data.json --jsonArray
