const re = /([,\-\'\s])/g;

const Letter = function(letter) {
  this.letter = letter;
  this.guessed = false;
};
Letter.prototype.renderChar = function() {
  if (this.letter.match(re) || this.guessed) {
    return this.letter;
  } else {
    return '_';
  }
};

module.exports = Letter;
