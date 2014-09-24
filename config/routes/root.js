var express = require('express');

var root = require('../../app/controller/root');

function rootRoutes(app) {
  var rootRouter = express.Router();

  // Root
  rootRouter.route('/').get(root.home);

  rootRouter.route('/profile').get(isLoggedIn, root.profile);
  rootRouter.route('/main').get(isLoggedIn, root.main);
  rootRouter.route('/chat').get(isLoggedIn, root.chat);

  app.use('/', rootRouter);
}



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}


module.exports = rootRoutes;