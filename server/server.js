const express = require('express');
const socket = require('socket.io');
const session = require('express-session');
const personService = require('./services/personService.js');
const transactionService = require('./services/transactionService.js');

session.data = {
  persons: [],
  transactions: [],
};

// App setup
const PORT = 5000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(express.static('public'));

// Socket setup
const io = socket(server, { wsEngine: 'ws' });

const processManager = (client) => {
  setInterval(() => {
    //if person exists -> add only transaction
    const person = personService.generatePerson();
    const transaction = transactionService.generateTransaction(person.id);
    person.addTransaction(transaction);

    client.emit('personTransaction', person);
  }, 500);
};

io.on('connection', function (client) {
  client.on('subscribeToServer', (param) => {
    processManager(client);
  });
});
