'use strict';

const debug = require('debug')('socket-client');

// when disconnecting
const endConnection = () => {
  debug('Client disconnected');
};

// when receiving data
const msgReceived = (data) => {
  debug(`Client sent: ${data.toString()}`);
};

module.exports = (client) => {
  debug(`Client connected from ${client.remoteAddress}`);

  // setup events
  client.on('end', endConnection);
  client.on('data', msgReceived);
};
