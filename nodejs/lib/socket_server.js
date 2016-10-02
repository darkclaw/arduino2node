'use strict';

const ClientLog = require('debug')('socket-client');
const Net = require('net');

const onEndConnection = () => {
  ClientLog('Client disconnected');
};

const onMsgReceived = (data) => {
  ClientLog(`Client sent: ${data.toString()}`);
};

module.exports = Net.createServer((client) => {
  ClientLog(`Client connected from ${client.remoteAddress}`);

  client.on('end', onEndConnection);
  client.on('data', onMsgReceived);
});
