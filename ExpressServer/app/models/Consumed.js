// app/models/consumed.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ConsumedSchema   = new Schema({
    UserID: {
      type: Schema.Types.ObjectId, ref: 'User'},
    FDCID: {
      type: Number
    }
});

module.exports = mongoose.model('Consumed', BearSchema);