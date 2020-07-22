// app/models/consumed.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ConsumedSchema   = new Schema({
    user: {
      type: Schema.Types.ObjectId, ref: 'User'
    },
    foodId: {
      type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
    energy: {
        type: Number, 
        required: true
    },
    totalFat: {
      type: Number, 
      required: true
    },
    saturates: {
      type: Number, 
      required: true
    },
    carbs: {
      type: Number, 
      required: true
    },
    totalSugars: {
      type: Number, 
      required: true
    },
    protein: {
      type: Number, 
      required: true
    },
    salt: {
      type: Number, 
      required: true
    }
});

module.exports = mongoose.model('Consumed', ConsumedSchema);