var Letter = require("./letter");
// Create an array of letters & determine if guessed correctly
function Word(word) {
  this.letters = word.split("").map(function(char) {
    return new Letter(char);
  });
}

// Return the answer
Word.prototype.returnAnswer = function() {
  // Check each letter
  return this.letters.map(function(letter) {
    // Return the answer as array of solved letters
    return letter.returnAnswer();
  // Create string from the array of solved letters
  }).join('');
};

// Set 'toString as method
Word.prototype.toString = function() {
  // Look at letterDisplay.prototype.toString in letter.js
  return this.letters.join(' ');
};

// Checkk if letters in array match users guess
Word.prototype.guessLetter = function(char) {
  var foundLetter = false;
  this.letters.forEach(function(letter) {
    if (letter.guess(char)) {
      foundLetter = true;
    }
  });
  // Log the word gessed so far
  console.log("\n" + this + "\n");
  // return whether we found a letter
  return foundLetter;
};

// Returns if all letters have been guessed
Word.prototype.guessedCorrect = function() {
  return this.letters.every(function(letter) {
    return letter.visible;
  });
};

module.exports = Word;
