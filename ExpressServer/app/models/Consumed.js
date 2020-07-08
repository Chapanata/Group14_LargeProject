// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
    UserID:[
    {type: Schema.Types.ObjectId, ref: 'User'}
  ],
    foodID: Int32Array
});

module.exports = mongoose.model('Consumed', BearSchema);