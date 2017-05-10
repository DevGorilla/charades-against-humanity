/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
const crypto = require('crypto')
const moment = require('moment')
const AWS = require('aws-sdk')

const dynamodb = new AWS.DynamoDB()
const docClient = new AWS.DynamoDB.DocumentClient()

const decks = require('./data/decks.json');
const baseDeck = require('./data/base.json');
const names = require('./data/names.json');

const TableName = 'cah_games';

/*
  What kind of interactions do I expect?
  Select What Deck.
  Select What 'level of evil'
*/

function handler(event, context) {
  let level = event.level;
  if (!level) level = 0;
  let gameName = event.game_name;
  if (!gameName) gameName = createGameName();

  let gameObj = getGameObject(event.game_name);
  if (gameObj.deck.length === 0) gameObj.deck = baseDeck;
  let shuffledDeck = filterByLevel(shuffle(gameObj.deck), 0);

  const returnedCard = shuffledDeck[0];
  let tempDeck = shuffledDeck;
  tempDeck.splice(0, 1); // remove card being served from deck
  gameObj.deck = tempDeck; // set deck without card as deck

  /*
  saveGame(gameName, gameObj)
    .then(console.log)
    .catch(console.log);
    */

  context.done(null, returnedCard)

}


function inDynamo(inputKey) {
  // TODO: check if key exsists
}

function getGameObject(gameName) {
  let gameObj = {
    deck: baseDeck,
    score: { team_a: 0, team_b: 0 }
  };

  if (gameName) {
    // TODO: hit Dynamo
    return gameObj;
  } else {
    return gameObj;
  }
}

function getDecks() {
  const availableDecks = []
  Object.keys(decks.info).forEach((key) => {
    if (decks.info[key].name) {
      availableDecks.push(decks.info[key].name);
    }
  })
  return availableDecks;
}

function getGames() {
  // TODO: look for a specific gameName
  dynamodb.scan({
    TableName
  }, (err, data) => {
    context.done(null, data);
  })

}

function shuffle(array) {
  // Fisher-Yates
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function filterByLevel(array, level) {
  let output = [];
  array.forEach((item) => {
    if (item.level <= level) output.push(item.text)
  })
  return output;
}

function createGameName() {
  const firstName = names.adjectives[getRandomNumber(0, names.adjectives.length - 1)]
  const lastName = names.animals[getRandomNumber(0, names.animals.length - 1)]

  if (!inDynamo(`${firstName}-${lastName}`)) {
    return `${firstName}-${lastName}`
  } else {
    createGameName(); //
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function saveGame(gameName, gameObj) {
  return new Promise(function(resolve, reject) {
    docClient.put({
      TableName,
      Item: {
        message: gameObj,
        game_name: gameName,
        created_at: moment().unix(),
      }
    }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  });
}

module.exports = {
  handler,
  saveGame,
  shuffle,
  getGameObject,
}
