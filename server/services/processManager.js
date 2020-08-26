const personService = require('./personService.js');
const transactionService = require('./transactionService.js');
const { transactionUpdater } = require('./transactionUpdater.js');

const processManager = (client) => {
    if (!client.handshake.session.persons) {
        client.handshake.session.persons = [];
    }

    if (!client.handshake.session.transactions) {
        client.handshake.session.transactions = [];
    }

    setInterval(() => {
        let person = personService.generatePerson();
        const transaction = transactionService.generateTransaction(person.id);

        const index = client.handshake.session.persons.findIndex(
            (e) => { return e.id === person.id }
        );

        if (index > -1) {
            person = client.handshake.session.persons[index];
        } else {
            client.handshake.session.persons.push(person);
        }

        client.handshake.session.transactions.push(transaction);

        client.emit('personTransaction', person, transaction);
    }, 5000);

    client.on('updateTransaction', (transaction) => {
        transactionUpdater(client, transaction);

        client.emit('updateTransactions', client.handshake.session.transactions);
    });
}

module.exports = {
    processManager
};