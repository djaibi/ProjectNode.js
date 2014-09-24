var user  = require('../../../app/models/user');

function unlinkFb(req,res) {

	console.log('Unlinking facebook account for user : '+req.user._id);

	var user            = req.user;
    user.facebook.token = undefined;
    user.facebook.id = undefined;
    user.facebook.name = undefined;
    user.facebook.email = undefined;
    user.save(function(err) {
    	if(err) {
    		console.log('error user.save : '+err)
    		res.send({'error':'An error has occurred'});
    	} else {
     	   res.redirect('/profile');
    	}
    });
}

exports.unlinkFb = unlinkFb;

