var express = require('express');

// handlers
var posts = require('../../app/controller/posts');


function postsRoutes(app,passport) {
  var postsRouter = express.Router();

  	postsRouter.route('/')
		.get(posts.index)
    .post(posts.info);

  	postsRouter.route('/add')
    	//.get(posts.new)
    	.post(posts.create);

    postsRouter.route('/delete/:id')
      .get(posts.delete);

  app.use('/posts', isLoggedIn, postsRouter);
}


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

module.exports = postsRoutes;