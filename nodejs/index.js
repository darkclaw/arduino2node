'use strict';

const Express = require('express');
const LogSocket = require('debug')('socket');
const LogWeb = require('debug')('web');
const Net = require('net');
const Path = require('path');
const SocketClient = require('./lib/socket_client');

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

// start the Net server
const socket = Net.createServer(SocketClient);

socket.listen(process.env.SOCKET_PORT || 4000, () => {
  LogSocket(`Socket server listening on port ${socket.address().port}`);
});
