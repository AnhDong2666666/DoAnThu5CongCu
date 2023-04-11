'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoriesData = new Schema({
    name: String,
    description: String,
    page_id: {
        type:Number,
        default: 1
    },
    created_at: {
        type: Date,
        default: Date.now}
    ,
    updated_at: {
        type: Date,
        default: Date.now
    }
});

var categories = module.exports = mongoose.model('categories', categoriesData);

module.exports.getCategory = (callback, limit) => {
    categories.find(callback).limit(limit);
}

module.exports.getCategoryById = (id, callback) => {
    console.log("back");
    console.log(id);
    categories.findById(id, callback);
}

module.exports.getCategoryByPageId = (pageId, callback) => {
    console.log("back");
    console.log(pageId);
    categories.find({page_id: pageId}, callback);
}

module.exports.addCategory = (category, callback) => {
    categories.create(category, callback);
}

module.exports.updateCategory = (id, category, callback) => {
    var query = {
        _id: id
    };
    var update = {
        name: category.name,
        description: category.description,
        page_id: category.page_id
    }
    categories.update(query,{$set: update}, callback);
}
module.exports.removeCategory = (id, callback) => {
    var query = {
        _id: id
    };
    categories.remove(query, callback);
}
