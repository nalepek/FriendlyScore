class Person {
  constructor(id, name, creditScore, email) {
    this.id = id;
    this.name = name;
    this.creditScore = creditScore;
    this.email = email;
    this.transactions = [];
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

module.exports = Person;
