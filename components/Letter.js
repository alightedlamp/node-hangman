const Letter = function(letter) {
  this.letter = letter;
  this.showBlank = function() {
    return "_"; 
  }
  this.showLetter = function() {
    return this.letter;
  }
}

module.exports = Letter;
