function authorizeFb(req,res,passport) {
	passport.authorize('facebook', { scope : 'email' })(req, res);
}

exports.authorizeFb = authorizeFb;

