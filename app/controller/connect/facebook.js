function authorizeFb(req,res,passport) {
	console.log('je suis dans connect/facebook');
	passport.authorize('facebook', { scope : 'email' })(req, res);
}

/*function connectFb(req,res,passport) {
  passport.authorize('facebook', {
    successRedirect : '/profile',
    failureRedirect : '/',
    failureFlash : true // allow flash messages
  })(req, res);
}*/

exports.authorizeFb = authorizeFb;
//exports.connectFb = connectFb;
