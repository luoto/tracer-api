var _ = require('lodash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../api/user/userModel');

// configure sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// configure local strategy
passport.use(new LocalStrategy(verify));

// this function authenticates the user
function verify(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false, { message: 'Incorrect username.'});
    }

    if (user.password != password) {
      return done(null, false, { message: 'Incorrect password.'});
    }

    return done(null, user);

  });
};

module.exports = passport;
