var user  = require('../../../app/models/user');

function newSession(req,res) {
  res.render('login.ejs', { errors: '', message: req.flash('loginMessage'), login: req.isAuthenticated() });
}

function createSession(req,res,passport) {

  req.assert('email', 'A valid email is required').isEmail();
  req.assert('password', 'A password is required').notEmpty();

  var errors = req.validationErrors();

    if( !errors) {
      passport.authenticate('local-login', {
        successRedirect : '/main', // redirect to the secure profile section
        failureRedirect : '/auth/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
      })(req, res);
    }
    else {
      res.render('login.ejs', { errors: errors, message: req.flash('loginMessage'), login: req.isAuthenticated() });
    }

}

function destroySession(req,res) {
    req.logout();
    res.redirect('/');
}

exports.new    = newSession;
exports.create = createSession;
exports.destroy = destroySession;
