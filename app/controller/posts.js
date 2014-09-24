var user  = require('../../app/models/user');
var posts  = require('../../app/models/posts');
var ObjectId = require('mongoose').Types.ObjectId;

function index(req,res) {
	posts.find('_id, title', function(err, data) {
		res.render('posts.ejs', {
		posts : data
		});
	});
}

function info(req,res){
	var obj = {};
	posts.findById( req.body._id ).populate('user').exec(  function ( err, data ){
		data = data.toObject();
		if (req.user._id.equals(data.user._id)) {
			 
			data.owner = true;
			res.send(
				JSON.stringify(data)
			);
		} else {
			data.owner = false;
			res.send(
				JSON.stringify(data)
			);				
		}
	});		
}

function create(req,res) {
	console.log('ADDING a post for user: ' + req.user.id);
	console.log(req.body);
	var posts_data = new posts({
		title: req.body.title,
		body: req.body.body,
		user: new ObjectId(req.user.id)
	});

	console.log('Adding post: ' + posts_data);

	posts_data.save(function(error, data){
		if(error) {
			res.send({'error':'An error has occurred'});
		} else {
			console.log('Success');
			var user            = req.user;
			user.posts.push(data._id);
			user.save(function(error, data) {
				if (error) {
					res.send({'error':'An error has occurred'});
				}else {
					console.log('Success');
					res.redirect('/posts');
				}
			});
		}
	});
}

/*function newPost(req,res) {
	res.render('addpost.ejs');
}*/

function deletePost(req,res) {
	posts.findById( req.params.id, function ( err, data ){
		if (req.user._id.equals(data.user)) {
			data.remove( function ( err, data ){
      			res.redirect( '/posts' );
    		})
    	}
    	else {
    		res.send({'error':'An error has occurred'});
    	}
	});
}

exports.index = index;
exports.info = info;
//exports.new = newPost;
exports.create = create;
exports.delete = deletePost;