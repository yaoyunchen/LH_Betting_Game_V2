var prompt = require('sync-prompt').prompt;
var colors = require('colors');

var gameOn = true;
var player = {
  bankroll: 100,
  bet: 0,
  guess: 0
};
var houseNum = 0;
var betArray = [5, 6, 7, 8, 9, 10];
var guessArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function getPlayerGuess() {
  var validGuess = false;
  while (validGuess === false) {
    var guess = Number(prompt("Enter your guess from 1 to 10.\n".blue));
    if (guessArray.indexOf(guess) !== -1) {
      player.guess = guess;
      validGuess = true;
    } else {
      console.log("Invalid guess. ");
      validGuess = false;
    }
  }  
}

function getPlayerBet() {
  var validBet = false;
  while (validBet === false) {
    var bet = Number(prompt("Enter your bet from 5 to 10.\n".blue));
    if (betArray.indexOf(bet) !== -1) {
      player.bet = bet;
      validBet = true;
    } else {
      console.log("Invalid bet.");
      validBet = false;
    }
  }  
}

function loadPlayerInfo() {
  console.log(colors.cyan('Current Bankroll: $ %s'), player.bankroll);
  console.log(colors.cyan('Player Bet: $ %s'), player.bet);
  console.log(colors.cyan('Player Guess: %s'), player.guess);
}

function createGame() {
  genHouseNum();
  calcResults();
}

function genHouseNum() {
  houseNum = guessArray[Math.floor(Math.random() * guessArray.length)];
}

function calcResults() {
  console.log("House Number: %s".bgblue, houseNum);
  if (player.guess == houseNum) {
    player.bankroll += player.bet;
    console.log("You won! Your bankroll is now at $%s!".green, player.bankroll);
  } else if (player.guess == houseNum + 1 || player.guess == houseNum - 1) {
    console.log("You guessed %s.  The number is %s.  Your bankroll did not change.".grey, player.guess, houseNum);
  } else {
    player.bankroll -= player.bet;
    console.log("You guessed  %s.  The number is %s.  You lost your bet!".red, player.guess, houseNum);
  }
}

function checkBankroll() {
  if (player.bankroll - player.bet < 0 || player.bankroll < 5) {
    return false;
  } 
  else {
    return true;
  }
}

function replay() {
  player.bankroll = 100;
  player.bet = 0;
  player.guess = 0;
  console.log("Game reset!".green);
  loadPlayerInfo();  
}

while (gameOn === true) {
  var choice = prompt("Please select:\n1. Play game\n2. Exit game\n".blue);
  switch(choice) {
    case "1":
      loadPlayerInfo();   
      getPlayerGuess();
      getPlayerBet();
      createGame();
      loadPlayerInfo();   
      if (checkBankroll() === false) {
        console.log("Game over, you're broke!".red);
        var replayPrompt = prompt("Replay? (Y/N)\n".bgRed);
        switch(replayPrompt.toUpperCase()) {
          case "Y":
            replay(); 
            break;
          case "N":
            console.log("Goodbye.".magenta);
            gameOn = false;
            break;
          default:
            console.log("Invalid choice.".red);
        }
      }
      break;
    case "2":
      console.log("Goodbye.".magenta);
      gameOn = false;
      break;
    default:
      console.log("Invalid choice.".red);
  } 
}

