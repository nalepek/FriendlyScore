const express = require('express');
const socket = require('socket.io');
const session = require('express-session');
const sharedsession = require('express-socket.io-session');
const { processManager } = require('./services/processManager.js');

// App setup
const PORT = 5000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(express.static('public'));

const sessionMiddleware = session({
  secret: 'this is secret',
  resave: true,
  saveUninitialized: true,
});

app.use(sessionMiddleware);

// Socket setup
const io = socket(server, { wsEngine: 'ws' });
io.use(sharedsession(sessionMiddleware));

io.on('connection', function (client) {
  client.on('subscribeToServer', (param) => {
    processManager(client);
  });
});
