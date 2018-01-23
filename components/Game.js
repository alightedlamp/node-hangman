const inquirer = require('inquirer');
const Word = require('./Word.js');
const words = require('../words.js');

const Game = function() {
  this.wins = 0;
  this.losses = 0;
  this.totalGuesses = 6;
  this.guesses = [];
  this.currentWord = {};
  this.isPlaying = true;
};
Game.prototype.pickWord = function() {
  this.currentWord = new Word(words[Math.floor(Math.random() * words.length)]);
  this.currentWord.setBlanks().showBlanks();
  return this;
};
Game.prototype.guessALetter = function() {
  const _this = this;
  inquirer
    .prompt([
      {
        message: 'Guess a letter',
        name: 'guess'
      }
    ])
    .then(response => {
      _this.checkGuess(response.guess);
      if (_this.isPlaying) {
        _this.guessALetter();
      } else {
        _this.playAgain();
      }
    });
};
Game.prototype.checkGuess = function(guess) {
  if (this.guesses.indexOf(guess) !== -1) {
    console.log('Already chosen, pick again');
  } else {
    this.guesses.push(guess);
    if (!this.findMatches(guess)) {
      this.totalGuesses = this.totalGuesses - 1;
      if (this.totalGuesses === 0) {
        this.handleLoss();
      } else {
        console.log(`\nWrong!\n\n${this.totalGuesses} guesses remaining!\n`);
      }
    } else if (this.currentWord.blanks.join('') === this.currentWord.word) {
      this.handleWin();
    } else {
      console.log('\nCorrect!');
      this.currentWord.showBlanks();
    }
  }
  return this.isPlaying;
};
Game.prototype.findMatches = function(guess) {
  let i = 0;
  let found = false;
  let testCase = this.currentWord.word.indexOf(guess, i);

  while (testCase !== -1) {
    this.currentWord.blanks[testCase] = guess;
    found = true;
    i++;
    testCase = this.currentWord.word.indexOf(guess, i);
  }
  return found;
};
Game.prototype.handleLoss = function() {
  this.losses = this.losses - 1;
  this.isPlaying = false;
  console.log('You dead');
  return this;
};
Game.prototype.handleWin = function() {
  this.wins = this.wins + 1;
  this.isPlaying = false;
  console.log('\nYou win\n');
  return this;
};
Game.prototype.playAgain = function() {
  const _this = this;
  inquirer
    .prompt([
      {
        name: 'confirm',
        type: 'confirm',
        message: 'Do you want to play again?'
      }
    ])
    .then(
      response =>
        response.confirm ? _this.pickWord().guessALetter() : _this.endGame()
    );
};
Game.prototype.endGame = function() {
  console.log('Thanks for playing, goodbye');
};

module.exports = Game;
