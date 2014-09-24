var user  = require('../../../app/models/user');

function unlinkFb(req,res) {
	var user            = req.user;
    user.facebook.token = undefined;
    user.facebook.id = undefined;
    user.facebook.name = undefined;
    user.facebook.email = undefined;
    user.save(function(err) {
        res.redirect('/profile');
    });
}

exports.unlinkFb = unlinkFb;

