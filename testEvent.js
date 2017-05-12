const i = require('./index.js');

const context = {
  done(e, msg) {
    if (e) console.log(e);
    console.log(msg);
  },
};

i.handler(
  { decks:["base"],
   level:4,
   score: { team_a: 0, team_b: 0 }, // game_name
   }, context);
