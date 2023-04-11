var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var app = express();
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var hash = require('bcrypt-nodejs');
var path = require('path');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var debug = require('debug')('passport-mongo');
var formidable = require('formidable');

mongoose.connect('mongodb://127.0.0.1:27017/shops');
// mongoose.connect('mongodb://meanstack:meanstack@ds014648.mlab.com:14648/meanstack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error: '));
db.once('open', function() {
  console.log('DB connection success! ');
});

var products = require('./models/products');
var posts = require('./models/posts');
var categories = require('./models/categories');
var user = require('./models/user');
var productUser = require('./models/productUsers');




// BodyParser Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
///cookie
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, '../')));

// configure passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

var index = require('./routes/index');
var product = require('./routes/product');
var post = require('./routes/post');
var category = require('./routes/category')
var productUsers = require('./routes/productUsers');
var users = require('./routes/users');
var uploadRoutesApi = require('./routes/upload');
var postProduct = require('./routes/postProduct');


app.use('/', index);
app.use('/api/user', users);
app.use('/api/products', product);
app.use('/api/posts', post);
app.use('/api/categories', category);
app.use('/api/productUsers', productUsers);
app.use('/upload', uploadRoutesApi);
app.use('/api/postproduct', postProduct);



// app.listen(3000);
// console.log('Running on port 3000...');

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
module.exports = app;
