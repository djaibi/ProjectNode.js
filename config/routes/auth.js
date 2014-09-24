var express = require('express');

// handlers
var users = require('../../app/controller/auth/users');
var session = require('../../app/controller/auth/sessions');

function authRoutes(app,passport) {
  var authRouter = express.Router();

  	// Authentication
  	authRouter.route('/signup')
		.get(users.new)
   		.post(function(req, res) {
  			users.create(req,res,passport);
		});

  	// Login
  	authRouter.route('/login')
    	.get(session.new)
    	.post(function(req, res) {
  			session.create(req,res,passport);
		});

    // Facebook

    authRouter.route('/facebook')
    	.get(passport.authenticate('facebook', { scope : 'email' }));

    authRouter.route('/facebook/callback')
    	.get(passport.authenticate('facebook', {
			successRedirect : '/main',
			failureRedirect : '/',
			failureFlash : true // allow flash messages
		}));


  authRouter.get('/logout', session.destroy);

  app.use('/auth', authRouter);
}

module.exports = authRoutes;
