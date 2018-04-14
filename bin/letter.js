// Display letter or underscore
function letterDisplay(char) {
  this.visible = !/[a-z1-9]/i.test(char);
  this.char = char;
}

// Returns an underscore or character depending on 'this.visible'
letterDisplay.prototype.toString = function() {
  if (this.visible === true) { return this.char; }
  return "_";
};
// Return the answer
letterDisplay.prototype.returnAnswer = function() {
  return this.char;
};

// Check if guess is correct
letterDisplay.prototype.guess = function(charGuess) {
  if (charGuess.toUpperCase() === this.char.toUpperCase()) {
    this.visible = true;
    return true;
  }
  else {
    return false;
  }
};

module.exports = letterDisplay;
