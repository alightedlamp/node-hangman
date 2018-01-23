const Letter = require('./Letter.js');

const Word = function(word) {
  this.word = word;
  this.blanks = [];
};
Word.prototype.setBlanks = function() {
  this.blanks = this.word.split('').map(letter => new Letter(letter));
  return this;
};
Word.prototype.showBlanks = function() {
  console.log(
    `\n${this.blanks.map(letter => letter.renderChar()).join(' ')}\n`
  );
  return this;
};

module.exports = Word;
