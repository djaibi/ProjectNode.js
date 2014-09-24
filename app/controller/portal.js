function profile(req,res) {
	res.render('profile.ejs', {
		user : req.user // get the user out of session and pass to template
	});
}
exports.profile = profile;