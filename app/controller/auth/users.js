var user  = require('../../../app/models/user');

function newUser(req,res) {
  // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { errors: '', message: req.flash('signupMessage') });
}

function createUser(req,res,passport) {
    req.assert('email', 'A valid email is required').isEmail();
    req.assert('password', 'A password is required').notEmpty();
    req.assert('pseudo', 'A pseudo is required').notEmpty();

    var errors = req.validationErrors();

    if( !errors) {
      passport.authenticate('local-signup', {
          successRedirect : '/main', // redirect to the secure profile section
          failureRedirect : 'auth/signup', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
        })(req, res);
    }
    else {
      res.render('signup.ejs', { errors: errors, message: req.flash('signupMessage') });
    }
}

exports.new    = newUser;
exports.create = createUser;
