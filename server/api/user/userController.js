var _ = require('lodash');
var User = require('./userModel');
var passport = require('../../auth/auth');

exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.sendStatus(500);
    }
    if (!user) {
      return res.sendStatus(403);
    }
    req.login(user, function(err) {
      if(err) {
        return res.sendStatus(500);
      }
      return res.send({message: 'successfully logged in'});
    });
  })(req, res, next);
};

exports.logout = function(req, res) {
  req.logout();
  res.sendStatus(200);
};

exports.signup = function(req, res) {
  var newUser = new User(req.body);

  newUser.save(function(err, user) {
    if (err) {
      if (err.code === 11000) {
        res.sendStatus(409);
      }
      else {
        res.sendStatus(400);
      }
    }
    else {
      // establish session
      req.login(user, function(err) {
        if (err) {
          return res.sendStatus(500);
        }
        res.sendStatus(200);
      });
    }
  });
};
