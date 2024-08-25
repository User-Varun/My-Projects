'use strict';

const player0TotalScore = document.querySelector('.player-0-total-score');
const player1TotalScore = document.querySelector('.player-1-total-score');
const player0CurrentScore = document.querySelector('.player-0-current-score');
const player1CurrentScore = document.querySelector('.player-1-current-score');
const diceImage = document.querySelector('.dice-img');
const rollDiceBtn = document.querySelector('.roll-dice-btn');
const holdBtn = document.querySelector('.hold-score-btn');
const resetBtn = document.querySelector('.new-game-btn');

// things to do when game starts
player0TotalScore.textContent = 0;
player1TotalScore.textContent = 0;
diceImage.classList.add('hidden');

const switchPlayer = function () {
  document.querySelector(
    `.player-${activePlayer}-current-score`
  ).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  document
    .querySelector('.player-0')
    .classList.toggle('active-player-indicator-color');
  document
    .querySelector('.player-1')
    .classList.toggle('active-player-indicator-color');
};

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// when user clicks on roll dice btn
rollDiceBtn.addEventListener('click', function () {
  if (playing) {
    // generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // display the dice
    diceImage.classList.remove('hidden');
    diceImage.src = `dice-${dice}.png`;
    if (dice !== 1) {
      // if dice roll is 1 (add the score to current user score)
      currentScore += dice;
      document.querySelector(
        `.player-${activePlayer}-current-score`
      ).textContent = currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// now when user clicks on hold
holdBtn.addEventListener('click', function () {
  if (playing) {
    // 1. add the current score to the total score
    scores[activePlayer] += currentScore;
    document.querySelector(`.player-${activePlayer}-total-score`).textContent =
      scores[activePlayer];

    // 2. set the current score of user to zero.
    currentScore = 0;

    document.querySelector(
      `.player-${activePlayer}-current-score`
    ).textContent = 0;

    // 3. if (user has more than 100pts in their total score then they win , otherwise player swtiches)
    if (
      document.querySelector(`.player-${activePlayer}-total-score`)
        .textContent >= 50
    ) {
      //  user wins
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add('player-winner');

      document.querySelector(`.player-${activePlayer}-label`).style.color =
        '#c7365f';

      // setting the playing variable to false means not playing
      playing = false;
    } else {
      // player switches
      // switch to next player
      document.querySelector(
        `.player-${activePlayer}-current-score`
      ).textContent = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;

      document
        .querySelector('.player-0')
        .classList.toggle('active-player-indicator-color');
      document
        .querySelector('.player-1')
        .classList.toggle('active-player-indicator-color');
    }
  }
});

// when user resets the game
resetBtn.addEventListener('click', function () {
  document
    .querySelector(`.player-${activePlayer}`)
    .classList.remove('player-winner');

  document.querySelector(`.player-${activePlayer}-label`).style.color = '#333';

  diceImage.classList.add('hidden');

  player0CurrentScore.textContent = 0;
  player1CurrentScore.textContent = 0;
  player0TotalScore.textContent = 0;
  player1TotalScore.textContent = 0;

  currentScore = 0;
  activePlayer = 0;

  document
    .querySelector('.player-0')
    .classList.add('active-player-indicator-color');
  document
    .querySelector('.player-1')
    .classList.remove('active-player-indicator-color');
});
