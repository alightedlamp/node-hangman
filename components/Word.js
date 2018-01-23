const Letter = require('./Letter.js');

const Word = function(word) {
  this.word = word;
  this.blanks = [];
};

Word.prototype.splitWord = function() {
  this.word = this.word.split('').map(letter => new Letter(letter));
  return this;
};
Word.prototype.setBlanks = function() {
  this.blanks = this.word.split('').map(letter => '_');
  return this;
};
Word.prototype.showBlanks = function() {
  console.log(`\n${this.blanks.join(' ')}\n`);
};

module.exports = Word;
