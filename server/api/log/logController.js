var mongoose = require('mongoose');
var Log = require('./logModel').log;
var LongLat = require('./logModel').longlat;
var _ = require('lodash');

exports.get = function(req, res) {

  Log.find({user: mongoose.Types.ObjectId(req.user._id)}, function(err, log) {
    if (err) {
      return res.sendStatus(400);
    }
    else {
      var formattedLog = _.map(log, function(entry) {
        return {
          date: entry.date,
          elapsedTime: entry.elapsedTime,
          path: entry.path
        }
      });
      return res.send({log: formattedLog});
    }
  });

};

exports.post = function(req, res) {

  var formattedPath = _.map(req.body.log[0].path, function(point) {
    return new LongLat({long: point[0], lat: point[1]});
  });

  var entry = new Log({
    user: mongoose.Types.ObjectId(req.user._id),
    date: req.body.log[0].date,
    path: formattedPath
  });

  entry.save(function(err) {
    if (err) {
      res.sendStatus(400);
    }
    else {
      res.sendStatus(200);
    }
  });

  res.sendStatus(200);

};
