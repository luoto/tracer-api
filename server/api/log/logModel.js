var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LongLatSchema = new Schema({
  long: {
    type: Number,
    required: true
  },
  lat: {
    type: Number,
    required: true
  }
})

var LogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  timeElapsed: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
  path: {
    type: [LongLatSchema]
  }
});

module.exports = {
  longlat: mongoose.model('LongLat', LongLatSchema),
  log: mongoose.model('Log', LogSchema)
}
