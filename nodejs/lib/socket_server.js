'use strict';

const ClientLog = require('debug')('socket-client');
const ClientError = require('debug')('socket-client-error');
const Net = require('net');

const onEndConnection = () => {
  ClientLog('Client disconnected');
};

const onError = (err) => {
  ClientError(err.message);
};

const onMsgReceived = (data) => {
  ClientLog(`Client sent: ${data.toString()}`);
};

module.exports = Net.createServer((client) => {
  ClientLog(`Client connected from ${client.remoteAddress}`);

  client.on('end', onEndConnection);
  client.on('error', onError);
  client.on('data', onMsgReceived);
});
