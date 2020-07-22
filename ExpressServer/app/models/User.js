// app/models/user.js

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var UserSchema  = new Schema(
{
    // Account related fields
    name: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true
    },
    password: { 
        type: String, 
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    confirmCode: { 
        type: String, 
        required: true
    },
    confirmed: { 
        type: Boolean, 
        required: true, 
        default: false
    },
    sessionToken: {
        type: String
    },

    // User's physical properties
    gender: {
        type: String,
        required: false
    },
    weight: {
        type: Number,
        required: false
    },
    heightFeet: {
        type: Number,
        required: false
    },
    heightInch: {
        type: Number,
        required: false
    },
    bmi: {
        type: Number,
        required: false
    },
    consumed: [{
        type: Schema.Types.ObjectId, ref: 'Consumed'
    }]
});

module.exports = mongoose.model('User', UserSchema);