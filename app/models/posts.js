// app/models/chat.js
// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var postsSchema = mongoose.Schema({
    title: String,
    body: String,
    created: {type: Date, default: Date.now},
    modified: {type: Date},
    user : { type: Schema.Types.ObjectId, ref: 'User' }
});

postsSchema.methods.minimalData = function() {
	var obj = this.toObject();
	delete obj.body;
  	delete obj.created;
 	delete obj.modified;
	return obj;
};	

// create the model for users and expose it to our app
module.exports = mongoose.model('Posts', postsSchema);