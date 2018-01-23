const Game = require('./components/Game.js');

const run = function() {
  const hangman = new Game();
  hangman.pickWord().guessALetter();
};

run();
