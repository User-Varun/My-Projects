'use strict';

// storing values in variables

let score = 20;
let highscore = 0;
let currentScore;

// Preloading all the audios
const audio1 = new Audio('game-sounds/No-number-sound.mp3');
const audio2 = new Audio('game-sounds/Too-low-sound.mp3');
const audio3 = new Audio('game-sounds/Too-high-sound.mp3');
const audio4 = new Audio('game-sounds/winning-game-sound.mp3');
const audio5 = new Audio('game-sounds/losing-game-sound.mp3');
audio1.preload = 'auto';
audio2.preload = 'auto';
audio3.preload = 'auto';
audio4.preload = 'auto';
audio5.preload = 'auto';
audio1.volume = 0.2;
audio2.volume = 0.2;
audio3.volume = 0.2;
audio4.volume = 0.2;
audio5.volume = 0.2;

const bodytag = document.querySelector('body');

let currentScoreNumber = document.querySelector('.current-score-number');

const highScoreNumber = document.querySelector('.current-highscore-number');

const scoreBox = document.querySelector('.score-box');

const inputBox = document.querySelector('.input-area');

const checkBtn = document.querySelector('.check-btn');

const gameInfoText = document.querySelector('.game-info-text');

let secretNumber = Math.floor(Math.random() * 20) + 1;

console.log('Secret number is :', secretNumber);

checkBtn.addEventListener('click', function () {
  const userInputValue = Number(inputBox.value);
  console.log(userInputValue, typeof userInputValue);

  //   countering user inputs (if win or lose )
  if (!userInputValue) {
    audio1.play();
    gameInfoText.textContent = '⛔️ No number!';
  } else if (userInputValue < secretNumber) {
    audio2.play();
    gameInfoText.textContent = '📉 Too low!';
  } else if (userInputValue > secretNumber) {
    audio3.play();
    gameInfoText.textContent = '📈 Too high!';
  } else if (userInputValue === secretNumber) {
    audio4.play();

    gameInfoText.textContent = '🎉 Correct Number!';
    bodytag.style.backgroundColor = '#60b347';
    scoreBox.textContent = secretNumber;
    scoreBox.style.width = '30rem';
  }

  //   countering the score functionality
  if (!userInputValue) {
    currentScore = score;
    currentScore = currentScoreNumber.textContent;
    console.log('current score when user inputs no value', currentScore);
  } else if (score === 0) {
    audio5.play();
    gameInfoText.textContent = '💥 You lost the game';
    score = currentScoreNumber.textContent;
  } else if (userInputValue === secretNumber) {
    currentScoreNumber.textContent = currentScoreNumber.textContent;
  } else {
    currentScore = score = score - 1;
    currentScoreNumber.textContent = currentScore;
    console.log(currentScore);
  }

  //   countering the highscore functionality

  if (userInputValue !== secretNumber) {
    highScoreNumber.textContent = highscore;
    console.log(highscore);
  } else if (userInputValue === secretNumber) {
    highscore = currentScoreNumber.textContent;
    highScoreNumber.textContent = highscore;
    console.log(highscore);
  } else if (currentScoreNumber > highScoreNumber) {
    highscore = currentScoreNumber.textContent;
    highScoreNumber.textContent = highscore;
    console.log(highscore);
  }
});

// when user clicks on again btn

const againBtn = document.querySelector('.again-btn');

againBtn.addEventListener('click', function () {
  scoreBox.style.width = '15rem';
  scoreBox.textContent = '?';
  bodytag.style.backgroundColor = '#222';
  gameInfoText.textContent = 'Start guessing...';
  currentScoreNumber.textContent = score = 20;
  inputBox.value = '';
  secretNumber = secretNumber = Math.floor(Math.random() * 20) + 1;
  console.log('new secret number:', secretNumber);
});
