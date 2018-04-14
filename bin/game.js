var inquirer = require("inquirer");
var Word = require("./word");
var words = require("../etc/wordlist");
var colors = require('colors/safe');

// Logic for game
function Game() {
  var self = this;
  // Sets number of guesses (5)
  this.play = function() {
    this.guessesLeft = 5;
    this.nextWord();
  };
  // Create a new object using a random word from the array. Then run newGuess
  this.nextWord = function() {
    var randomWord = words[Math.floor(Math.random() * words.length)];
    this.currentWord = new Word(randomWord);
    console.log('\n' + this.currentWord + '\n');
    this.newGuess();
  };
  // Prompt use for letter guess
  this.newGuess = function() {
    this.askforLetter().then(function() {
      // Check if no guesses are left
      if (self.guessesLeft < 1) {
        console.log("No guesses left! Word was: \"" + self.currentWord.returnAnswer() + "\"\n");
        self.askToPlayAgain();
      }
      // Create new Word
      else if (self.currentWord.guessedCorrect()) {
        console.log("You guessed the word!!");
        self.askToPlayAgain();
      }
      // Keep playing if guesses are remaining
      else {
        self.newGuess();
      }
    });
  };
  // Prompt the user if they want to play again
  this.askToPlayAgain = function() {
    inquirer.prompt([
      {
        type: "confirm",
        name: "choice",
        message: "Do you want to play again?"
      }
    ]).then(function(val) {
      if (val.choice) {
        self.play();
      }
      else {
        self.goodBye();
      }
    });
  };

  // Prompts the user for a letter
  this.askforLetter = function() {
    return inquirer.prompt([
      {
        type: "input",
        name: "choice",
        message: "Guess a letter!",
        validate: function(val) {
          // The users guess must be a number or letter
          return /[a-z1-9]/gi.test(val);
        }
      }
    ]).then(function(val) {
      // Log if correct guess
      var correctGuess = self.currentWord.guessLetter(val.choice);
      if (correctGuess) {
        console.log(colors.green("\nCORRECT!!!\n"));
      }
      // Tell the user how many guesses are left
      else {
        self.guessesLeft--;
        console.log(colors.red("\nINCORRECT!!!\n"));
        console.log(self.guessesLeft + " guesses remaining!!!\n");
      }
    });
  };
  // Goodbye!
  this.goodBye = function() {
    console.log("\nGoodbye!");
    process.exit(0);
  };
}
module.exports = Game;
