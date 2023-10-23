'use strict';

let highscore = 0;
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
document.querySelector('.number').textContent = '?';

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
}

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  // console.log(guess, typeof guess);

  // No number input
  if (!guess) {
    displayMessage('No number! ⛔');

    // Guess is correct
  } else if (guess === secretNumber) {
    displayMessage('Correct number!✔👍');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#27BE49';
    document.querySelector('.number').style.width = '40rem';
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent =  highscore;      
    }

  } else if (guess !== secretNumber) {
    if (score > 0) {
      displayMessage(guess > secretNumber ? 'Your guess is too high!❌📈' : 'Your guess is too low!❌📉');
      // document.querySelector('.message').textContent =  
      // Condition         ?  Guess is higher than correct number : Guess is lower than correct number
        // guess > secretNumber ? 'Your guess is too high!❌📈' : 'Your guess is too low!❌📉';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      // User lost the game
      displayMessage('You lost the game!❌');
      document.querySelector('.score') = 0;
      document.querySelector('body').style.backgroundColor = '#F10E0E';
    }
  }
});

// CODING CHALLENGE
// Implement a game rest functionality, so that the player can make a new guess!

// Your tasks:
// 1. Select the element with the 'again' class and attach a click event handler
// 2. In the handler function, restore initial values of the 'score' and 'secretNumber' variables
// 3. Restore the initial conditions of the message , number, score and guess input fields
// 4. Also restore the original background color (#222) and number width (15rem)

// Implementing a function to button "Again"
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage('Start guessing...');
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});