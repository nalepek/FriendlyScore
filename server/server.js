const express = require('express');
const socket = require('socket.io');
const session = require('express-session');
const personService = require('./services/personService.js');
const transactionService = require('./services/transactionService.js');
const sharedsession = require('express-socket.io-session');

// session.data = {
//   persons: [],
//   transactions: [],
// };

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
// io.use((socket, next) => {
//   sharedsession(sessionMiddleware(socket.request, socket.request.res, next));
// });
io.use(sharedsession(sessionMiddleware));

// app.use((req, res, next) => {
//   const session = req.session;

//   debugger;
//   if (!session.connections) session.connections = 0;

//   next();
// });

const processManager = (client) => {
  if (!client.handshake.session.persons) {
    client.handshake.session.persons = [];
  }

  setInterval(() => {
    //if person exists -> add only transaction
    let person = personService.generatePerson();
    const transaction = transactionService.generateTransaction(person.id);

    const index = client.handshake.session.persons.findIndex(
      (e) => e.id == person.id
    );
    if (index > 0) {
      person = client.handshake.session.persons[index].addTransaction(
        transaction
      );
    } else {
      person.addTransaction(transaction);
      client.handshake.session.persons.push(person);
    }

    client.emit('personTransaction', person);
  }, 5000);
};

io.on('connection', function (client) {
  client.on('subscribeToServer', (param) => {
    //console.log('CONNECTION');
    //console.log(client.handshake.session);
    processManager(client);
  });
});
