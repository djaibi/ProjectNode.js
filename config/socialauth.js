// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '799942500068298', // your App ID
		'clientSecret' 	: '240b0c209b695197f8df6c847856af1f', // your App Secret
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	}
	
};

