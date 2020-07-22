// app/models/consumed.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ConsumedSchema   = new Schema({
    user: {
      type: Schema.Types.ObjectId, ref: 'User'
    },
    foodId: {
      type: Number, 
      required: true
    },
    quantity: {
      type: Number, 
      required: true
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
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Consumed', ConsumedSchema);