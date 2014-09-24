function home(req,res) {
	res.render('index.ejs', { message: req.flash('index'), login: req.isAuthenticated() });
}

function profile(req,res) {
	res.render('profile.ejs', {
		user : req.user // get the user out of session and pass to template
	});
}

function main(req,res) {
	res.render('main.ejs');
}

function chat(req,res) {
	res.render('chat.ejs');
}

exports.home = home;
exports.profile = profile;
exports.main = main;
exports.chat = chat;