'use strict';

const ClientLog = require('debug')('socket-client');
const ClientError = require('debug')('socket-client-error');
const Net = require('net');
const Writable = require('stream').Writable;

let Io; //Socket.io instance

const onEndConnection = () => {
  ClientLog('Client disconnected');
};

const onError = (err) => {
  ClientError(err.message);
};

const browserStream = new Writable({
  write: (chunk, encoding, callback) => {
    ClientLog(`Client sent: ${chunk.toString()}`);

    const json = JSON.parse(chunk.toString());
    Io.emit('arduino:message', json);

    callback();
  }
});

module.exports = (io) => {
  Io = io;

  return Net.createServer((client) => {
    ClientLog(`Client connected from ${client.remoteAddress}`);

    client.on('end', onEndConnection);
    client.on('error', onError);

    client.pipe(browserStream);
  });
};
