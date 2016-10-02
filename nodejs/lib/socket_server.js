'use strict';

const ClientLog = require('debug')('socket-client');
const ClientError = require('debug')('socket-client-error');
const Net = require('net');

let Io; //Socket.io instance

const onEndConnection = () => {
  ClientLog('Client disconnected');
};

const onError = (err) => {
  ClientError(err.message);
};

const onMsgReceived = (data) => {
  ClientLog(`Client sent: ${data.toString()}`);

  const json = JSON.parse(data.toString());
  Io.emit('arduino:message', json);
};

module.exports = (io) => {
  Io = io;

  return Net.createServer((client) => {
    ClientLog(`Client connected from ${client.remoteAddress}`);

    client.on('end', onEndConnection);
    client.on('error', onError);
    client.on('data', onMsgReceived);
  });
};
