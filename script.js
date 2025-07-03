const colours = ['Red','Blue','Green','Pink','Black','Yellow','Orange','White','Purple','Brown'];

let score = 0;
let timeLeft = 30;
let timerRunning = false;

const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const wordDisplay = document.getElementById('color-word');
const inputBox = document.getElementById('input-box');
const startBtn = document.getElementById('start-btn');

let gameTimer;

// Start the game
startBtn.addEventListener('click', () => {
  if (!timerRunning) {
    score = 0;
    timeLeft = 30;
    inputBox.value = '';
    inputBox.disabled = false;
    inputBox.focus();
    timerRunning = true;
    startCountdown();
    nextColour();
  }
});

// Handle input
inputBox.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    checkAnswer();
    nextColour();
  }
});

// Countdown timer
function startCountdown() {
  gameTimer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(gameTimer);
      timerRunning = false;
      wordDisplay.textContent = "Game Over!";
      inputBox.disabled = true;
    }
  }, 1000);
}

// Pick the next color
function nextColour() {
  const shuffled = [...colours].sort(() => 0.5 - Math.random());
  wordDisplay.textContent = shuffled[0];
  wordDisplay.style.color = shuffled[1];
}

// Check if input is correct
function checkAnswer() {
  const typed = inputBox.value.trim().toLowerCase();
  const actualColor = wordDisplay.style.color;
  const temp = document.createElement("div");
  temp.style.color = actualColor;
  document.body.appendChild(temp);
  const correct = window.getComputedStyle(temp).color;
  document.body.removeChild(temp);

  const inputColor = document.createElement("div");
  inputColor.style.color = typed;
  document.body.appendChild(inputColor);
  const typedColor = window.getComputedStyle(inputColor).color;
  document.body.removeChild(inputColor);

  if (correct === typedColor) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
  }

  inputBox.value = '';
}
