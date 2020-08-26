const transactionUpdater = (client, transaction) => {
    const transactions = [...client.handshake.session.transactions];
    const index = transactions.findIndex((e) => {
        return e.id === transaction.id;
    });

    const oldCategory = transactions[index].categoryName;
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].categoryName === oldCategory) {
            transactions[i].categoryName = transaction.categoryName;
        }
    }

    client.handshake.session.transactions = transactions;
}

module.exports = {
    transactionUpdater
};