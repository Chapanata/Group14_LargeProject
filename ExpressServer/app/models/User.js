// app/models/user.js

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var UserSchema  = new Schema(
{
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
    }
});

module.exports = mongoose.model('User', UserSchema);