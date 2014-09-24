// app/models/chat.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var chatSchema = mongoose.Schema({
    nick: String,
    msg: String,
    created: {type: Date, default: Date.now}
});

// create the model for chat and expose it to our app
module.exports = mongoose.model('Message', chatSchema);