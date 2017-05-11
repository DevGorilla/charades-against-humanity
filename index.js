/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
const baseDeck = require('./data/sfw.json');

function handler(event, context) {
  const returnedCard = shuffledDeck[0];
  context.done(null, returnedCard);
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
  saveGame,
  shuffle,
  getGameObject,
};
