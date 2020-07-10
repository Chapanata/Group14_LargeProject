// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
    email: String,
    password: String,
    confirmCode: String,
    confirmed: Int8Array,
    name: String,
    sessionToken: String
});

module.exports = mongoose.model('User', BearSchema);