/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
const baseDeck = require('./data/base.json');

function handler(event, context) {
  console.log(event);
  const shuffledDeck = filterByLevel(shuffle(baseDeck),event.level)
  console.log(`${shuffledDeck.length} level ${event.level}`);
  const returnedCard = shuffledDeck[0];
  context.done(null, returnedCard);
}

function filterByLevel(array, level) {
  if (!level) level = 0;
  const output = [];
  array.forEach((item) => {
    if (item.level <= level) output.push(item.text);
  });
  return output;
}

function shuffle(input) {
  const array = input;
  // Fisher-Yates
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

module.exports = {
  handler,
};
