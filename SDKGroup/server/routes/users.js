var express = require('express');
var router = express.Router();
var passport = require('passport');
var ObjectId = require('mongoose').Types.ObjectId;

var User = require('../models/user.js');

router.get('/', (req, res) => {
    User.getUser((err, user) => {
        if (err) {
            res.status(555)
            res.end();
        }
        res.json(user);
        res.end();
    });
});

router.post('/register', function(req, res) {
    console.log(req.body.username,req.body.password);
    const newUser = new User({
      username: req.body.username,
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address
    });
    User.register(newUser,req.body.password, function(err, account) {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            req.logIn(account, function(err) {
                if (err) {
                    return res.status(500).json({
                        err: 'Could not log in user'
                    });
                }
                res.status(200).json({
                    status: 'Login successful!',
                    account: account
                });
            });
        });
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            res.status(200).json({
                status: 'Login successful!',
                user: user
            });
        });
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});

router.get('/status', function(req, res) {
    if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false
        });
    }
    res.status(200).json({
        status: true
    });
});

router.get('/:id', (req, res) => {
    var id = req.params.id;
    User.getUserById(id, (err, user) => {
        if (err) {
            throw err;
        }
        res.json(user);
    });
});

router.delete('/:id', (req, res) => {
    var id = req.params.id;
    console.log(id,"id");
    var _oid = id.split(':');
    var id2 = ObjectId(_oid[1]);
    User.removeUser(id2, (err, user) => {
        if (err) {
            throw err;
        }
        res.json(user);
    });
});

module.exports = router;
