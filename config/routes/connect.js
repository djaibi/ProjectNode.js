var express = require('express');

//handlers
var connectFb = require('../../app/controller/connect/facebook');

function connectRoutes(app,passport) {
  var connectRouter = express.Router();

    // Facebook
    connectRouter.route('/facebook/')
    	.get(function(req, res) {
        connectFb.authorizeFb(req,res,passport);
      });

    /*connectRouter.route('/facebook/callback')
      .get(function(req, res) {
        connectFb.connectFb(req,res,passport);
      });*/

  app.use('/connect', connectRouter);
}

module.exports = connectRoutes;
