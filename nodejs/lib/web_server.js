'use strict';

const Express = require('express');
const Path = require('path');

const app = Express();

// view engine setup
app.set('views', Path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => {
  res.render('index');
});

module.exports = app;
