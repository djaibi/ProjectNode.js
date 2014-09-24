var user  = require('../../app/models/user');
var posts  = require('../../app/models/posts');
var ObjectId = require('mongoose').Types.ObjectId;

function index(req,res) {

	console.log('Retrieving posts');

	posts.find('_id, title', function(err, data) {
		if (err) {
			console.log('error posts.find : '+err);
			res.send({'error':'An error has occurred'});
		} else {
			console.log('Success : '+data);
			res.render('posts.ejs', {
				posts : data,
				message: req.flash('postsMessage')
			});
		} 
	});
}

function info(req,res) {
	var obj = {};

	console.log('Retrieving post by id : '+req.body._id);

	posts.findById( req.body._id, null, {created: {'_id': -1}} ).populate('user').exec(  function ( err, data ){
		if (err) {
			console.log('error post.findById : '+err);
			res.send({'error':'An error has occurred'});
		} else {
			data = data.toObject();
			if (req.user._id.equals(data.user._id)) { 
				data.owner = true;
				console.log('Success : '+data);	
				res.send(JSON.stringify(data));
			} else {
				data.owner = false;
				console.log('Success : '+data);	
				res.send(JSON.stringify(data));				
			}		
		}
	});		
}

function create(req,res) {

	req.assert('title', 'A valid email is required').notEmpty();

    var errors = req.validationErrors();

	if( !errors) {

		var posts_data = new posts({
			title: req.body.title,
			body: req.body.body,
			user: new ObjectId(req.user.id)
		});

		console.log('Adding post: ' + posts_data);

		posts_data.save(function(err, data){
			if(err) {
				console.log('error posts.save :'+err);
				res.send({'error':'An error has occurred'});
			} else {
				console.log('Success : '+data);
				console.log('Linking new post '+data._id+' to user : '+req.user._id);
				var user = req.user;
				user.posts.push(data._id);
				user.save(function(error, data) {
					if (error) {
						console.log('error user.save : '+err);
						res.send({'error':'An error has occurred'});
					}else {
						console.log('Success : '+data);
						res.redirect('/posts');
					}
				});
			}
		});

   	} else {
   		req.flash('postsMessage', 'Title required');
   		res.redirect( '/posts' );
   	}
}

function update(req,res) {

	req.assert('title', 'A valid email is required').notEmpty();

    var errors = req.validationErrors();

	if( !errors) {

		console.log('Updating post: ' + req.params.id);

		posts.update(
	        {_id:req.params.id},
	        {
	            $set: {
					title: req.body.title,
					body: req.body.body,
					modified: Date.now()
	            }
	        },
	        false,
	        function (err) {
	        	if(err) {
	        		console.log('error user.save : '+err);
	        		res.send({'error':'An error has occurred'});
	        	}
	        }
	    );

		res.redirect('/posts');
	}
	else {
		req.flash('postsMessage', 'Title required');
		res.redirect( '/posts' );		
	}
}

function deletePost(req,res) {

	console.log('Deleting post: ' + req.params.id);

	posts.findById( req.params.id, function ( err, data ){
		if (req.user._id.equals(data.user)) {
			data.remove( function ( err, data ){

				if (err) {
					console.log('error post.delete : '+err);
	        		res.send({'error':'An error has occurred'});
				} else {
					console.log('Success : '+data);
					var user = req.user;
					var i = user.posts.indexOf(data._id);
					if(i != -1) {
						user.posts.splice(i, 1);
					}

					console.log('Unlinking deleted post '+data._id+' to user : '+req.user._id);

					user.save(function(error, data) {

						if (error) {
							console.log('error user.save : '+err);
							res.send({'error':'An error has occurred'});
						}else {
							console.log('Success : '+data);
							res.redirect('/posts');
						}
					});
				}
    		});
    	}
    	else {
    		console.log('Deleting impossible user is not the owner');
    		res.send({'error':'An error has occurred'});
    	}
	});
}

exports.index = index;
exports.info = info;
exports.update = update;
exports.create = create;
exports.delete = deletePost;