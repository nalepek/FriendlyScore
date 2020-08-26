const {
  generateId,
  generateNumber,
  generateBrand,
  generateCategory,
} = require('./generators.js');
const Transaction = require('../models/transaction');

function generateTransaction(personId) {
  const id = generateId();
  const amount = generateNumber(1, 50);
  const name = generateBrand();
  const categoryName = generateCategory();

  return new Transaction(id, personId, amount, name, categoryName);
}

module.exports.generateTransaction = generateTransaction;
