function connectAllRoutes(app,passport) {
  require('./root')(app);
  require('./auth')(app, passport);
  require('./connect')(app, passport);
  require('./unlink')(app);
  require('./posts')(app);  
}

module.exports = connectAllRoutes;