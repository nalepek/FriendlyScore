const {
  generateId,
  generatePersonName,
  generateEmail,
  generateNumber,
} = require('./generators.js');
const Person = require('../models/person');

function generatePerson() {
  const id = generateId();
  const name = generatePersonName();
  const email = generateEmail(name);
  const creditScore = generateNumber();

  return new Person(id, name, creditScore, email);
}

module.exports.generatePerson = generatePerson;
