const { isString } = require('../utils');
const names = require('../dictionaries/names.json');
const brands = require('../dictionaries/brands.json');
const categories = require('../dictionaries/categories.json');

function generateId() {
  return generateNumber();
}

function generatePersonName() {
  min = 0;
  max = names.length;

  const index = Math.floor(Math.random() * (max - min)) + min;

  return names[index];
}

function generateEmail(name) {
  if (!name || !isString(name)) {
    throw new Error(
      'Name for email generator is mandatory. Provide name as string.'
    );
  }

  const nam = name.toLowerCase();
  return nam + '.' + nam.split('').reverse().join('') + '@example.com';
}

function generateNumber(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateBrand() {
  min = 0;
  max = brands.length;

  const index = Math.floor(Math.random() * (max - min)) + min;

  return brands[index];
}

function generateCategory() {
  min = 0;
  max = categories.length;

  const index = Math.floor(Math.random() * (max - min)) + min;

  return categories[index];
}

module.exports = {
  generateId,
  generatePersonName,
  generateEmail,
  generateNumber,
  generateBrand,
  generateCategory
};
