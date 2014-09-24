// server.js

// set up ======================================================================
// call the packages we need

var express  = require('express');				// call express
var app      = express();						// define our app using express
var port     = process.env.PORT || 8080;	
var mongoose = require('mongoose');
var passport = require('passport');
var flash 	 = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var expressValidator = require('express-validator');

var configDB = require('./config/database.js');

var chatServer = require('./lib/chat-server.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('views', __dirname+'/app/views'); // change default view directory
app.set('view engine', 'ejs'); // set up ejs for templating


// required for passport
app.use(session({ secret: 'ilovenodesjs!!!' })); // session secret
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(express.static(__dirname));

// routes ======================================================================
//require('./app/routes.js')(app, passport, router); // load our routes and pass in our app passport
require("./config/routes")(app,passport);


// launch ======================================================================
//var server = http.createServer(app).listen(port, '127.0.0.1');
var server = app.listen(port);

console.log('Server running on port : ' + port);

chatServer.listen(server);