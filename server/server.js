var express = require('express');
var api = require('./api/api');
var router = express.Router();
var app = express();
var config = require('./config/config');
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tracer');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Successfully connected to tracer');
});

// require authentication module
var passport = require('./auth/auth');

// apply middleware
app.use(cors({
  origin: true,
  methods: ['GET', 'POST'],
  credentials: true,
  maxAge: 3600 * 60
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
  secret: 'sugarcubesNice',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


// mount our routes
app.use('/api', api);

module.exports = app;
