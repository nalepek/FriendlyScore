class Transaction {
  constructor(id, personId, amount, name, categoryName) {
    this.id = id;
    this.personId = personId;
    this.amount = amount;
    this.name = name;
    this.categoryName = categoryName;
  }
}

module.exports = Transaction;