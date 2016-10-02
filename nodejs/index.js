'use strict';

const LogSocket = require('debug')('socket');
const LogWeb = require('debug')('web');

const SocketServer = require('./lib/socket_server');
const WebServer = require('./lib/web_server');

// start the Express App
const server = WebServer.listen(process.env.WEB_PORT || 3000, function() {
  LogWeb('Express server listening on port ' + server.address().port);
});

// start the TCP Socket server
SocketServer.listen(process.env.SOCKET_PORT || 4000, () => {
  LogSocket(`Socket server listening on port ${SocketServer.address().port}`);
});
