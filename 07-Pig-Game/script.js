'use strict';
// # = SELECTOR FOR ID
// document.querySelector('#ID') = document.getElementById('ID');
const scoreP1 = document.getElementById('score--1');
const scoreP2 = document.getElementById('score--2');
const player1 = document.querySelector('.player--1');
const player2 = document.querySelector('.player--2');
const current1 = document.getElementById('current--1');
const current2 = document.getElementById('current--2');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn-new');
const btnHold = document.querySelector('.btn-hold');
const btnRoll = document.querySelector('.btn-roll');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 1;
let gameOn = true;

// STARTING CONDITIONS
scoreP1.textContent = 0;
scoreP2.textContent = 0;
dice.classList.add('hidden');

// FUNCTION TO SWITCH PLAYER
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

// FUNCTION TO ROLL THE DICE
btnRoll.addEventListener('click', function () {
  if (gameOn) {
    // GENERATE A RANDOM DICE ROLL
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    // DISPLAY DICE
    dice.classList.remove('hidden');
    dice.src = `dice-${diceRoll}.png`;

    // CHECK IF ROLLED 1      IF TRUE: SWITCH PLAYER    |     IF FALSE, ADD VALUE TO SCORE
    if (diceRoll !== 1) {
      // ADD DICE VALUE TO SCORE
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

// FUNCTION TO HOLD THE SCORE
btnHold.addEventListener('click', function () {
  if (gameOn) {
    // ADD CURRENT SCORE TO ACTIVE PLAYER'S SCORE
    scores[activePlayer - 1] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer - 1];
    // CHECK IF PLAYER'S SCORE >= 100     IF TRUE: PLAYER WINS    |     IF FALSE: SWITCH PLAYER
    if (scores[activePlayer - 1] >= 100) {
      // PLAYER WINS
      console.log('Acabou o jogo');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      dice.classList.add('hidden');
      gameOn = false;
    } else {
      switchPlayer();
    }
  }
});

// FUNCTION TO CREATE NEW GAME
btnNew.addEventListener('click', function () {
  location.reload();
});
