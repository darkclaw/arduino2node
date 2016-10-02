'use strict';

const LogWeb = require('debug')('web');
const Express = require('express');
const Path = require('path');

const app = Express();

// view engine setup
app.set('views', Path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => {
  res.render('index');
});

// start the Express App
const httpServer = app.listen(process.env.WEB_PORT || 3000, function() {
  LogWeb('Express server listening on port ' + httpServer.address().port);
});
