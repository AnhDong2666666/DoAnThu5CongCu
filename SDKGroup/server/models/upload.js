var formidable = require('formidable');
var fs = require('fs');
var jsonResponse = require('../response');
var bodyParser = require('body-parser');

module.exports.postFile = function(req,res) {
    var form = new formidable.IncomingForm();

    form.on('fileBegin', function(name, file) {
        file.name = Date.now() + '_' + file.name;
        file.path = "../uploads/file/" + file.name;
        console.log('file.path 1', file.path, file.name);
    })
    form.on('file', function(name, file){
        console.log('uploaded file', file.name);
        res.json({
            status: 100,
            content: 'file/'+file.name
        });
    })
    form.on('error', function (err) {
        console.log('An error has occured: \n' + err);
        res.json({
            status: 101
        });
    });
    form.on('end', function () {
        console.log('done upload!');
    });
    form.parse(req);
}
module.exports.postImage = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req);
    form.on('fileBegin', function(name, file) {
        file.name = Date.now() + '_' + file.name;
        file.path = "./uploads/imgs/" + file.name;
    })
    form.on('file', function(name, file){
        console.log('uploaded image', file.name);
        res.json({
            status: 100,
            content: 'uploads/imgs/'+file.name
        });
    })
    form.on('error', function (err) {
        console.log('An error has occured: \n' + err);
        res.json({status: 101});
    });
    form.on('end', function () {
        console.log('done upload!');
    });
}
module.exports.postAvatar = function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req);
    form.on('fileBegin', function(name, file) {
        console.log(file)
        file.name = Date.now() + '_' + file.name;
        file.path = "../uploads/avatars/" + file.name;
    })
    form.on('file', function(name, file){
        console.log('uploaded avatar', file.name);
        res.json({
            status: 100,
            content: 'uploads/avatars/'+file.name
        });
    })
    form.on('error', function (err) {
        console.log('An error has occured: \n' + err);
        res.json({status: 101});
    });
    form.on('end', function () {
        console.log('done upload!');
    });
}
