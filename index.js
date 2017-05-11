/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
const moment = require('moment');
const AWS = require('aws-sdk');
const baseDeck = require('./data/base.json');
const names = require('./data/names.json');

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const TableName = 'cah_games';


function handler(event, context) {
  let level = event.level;
  if (!level) level = 4;
  let gameName = event.game_name;
  if (!gameName) gameName = createGameName();

  const gameObj = getGameObject(event.game_name);
  if (gameObj.deck.length === 0) gameObj.deck = baseDeck;
  const shuffledDeck = filterByLevel(shuffle(gameObj.deck), 0);

  const returnedCard = shuffledDeck[0];
  const tempDeck = shuffledDeck;
  tempDeck.splice(0, 1); // remove card being served from deck
  gameObj.deck = tempDeck; // set deck without card as deck

  /*
  saveGame(gameName, gameObj)
    .then(console.log)
    .catch(console.log);
    */

  context.done(null, returnedCard);
}


function inDynamo(inputKey) {
  // TODO: check if key exsists
}

function getGameObject(gameName) {
  const gameObj = {
    deck: baseDeck,
    score: {
      team_a: 0,
      team_b: 0,
    },
  };

  if (gameName) {
    // TODO: hit Dynamo
    return gameObj;
  } else {
    return gameObj;
  }
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

function filterByLevel(array, level) {
  const output = [];
  array.forEach((item) => {
    if (item.level <= level) output.push(item.text);
  });
  return output;
}

function createGameName() {
  const firstName = names.adjectives[getRandomNumber(0, names.adjectives.length - 1)];
  const lastName = names.animals[getRandomNumber(0, names.animals.length - 1)];

  if (!inDynamo(`${firstName}-${lastName}`)) return `${firstName}-${lastName}`;

  createGameName();
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function saveGame(gameName, gameObj) {
  return new Promise((resolve, reject) => {
    docClient.put({
      TableName,
      Item: {
        message: gameObj,
        game_name: gameName,
        created_at: moment().unix(),
      },
    }, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`saved game ${gameName} to Dynamo`);
        resolve();
      }
    });
  });
}

module.exports = {
  handler,
  saveGame,
  shuffle,
  getGameObject,
};
