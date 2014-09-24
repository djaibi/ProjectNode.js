var express = require('express');

//handlers
var unlinkFb = require('../../app/controller/unlink/facebook');


function unlinkRoutes(app,passport) {
  var unlinkRouter = express.Router();

    // Facebook
    unlinkRouter.route('/facebook/')
    	.get(function(req, res) {
    		unlinkFb.unlinkFb(req,res,passport);
    	});

  app.use('/unlink', unlinkRouter);
}

module.exports = unlinkRoutes;