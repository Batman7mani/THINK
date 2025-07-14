const sentences = [
  "I love learning new things.",
  "Practice makes perfect.",
  "You are a smart thinker.",
  "Reading is fun and powerful.",
  "Be proud of your progress."
];

let currentText = "";
let score = 0;
let level = 1;
let highScore = localStorage.getItem("highScore") || 0;

document.getElementById("highScore").textContent = highScore;

let startTime = null;
let intervalId;

const display = document.getElementById("displayText");
const input = document.getElementById("typingInput");
const feedback = document.getElementById("feedbackMsg");
const timerDisplay = document.getElementById("timer");
const accuracyDisplay = document.getElementById("accuracy");
const nextBtn = document.getElementById("nextBtn");

// Typing sound
const clickSound = new Audio("https://www.soundjay.com/button/beep-07.wav");

function loadNextSentence() {
  currentText = sentences[Math.floor(Math.random() * sentences.length)];
  display.textContent = currentText;
  input.value = "";
  input.classList.remove("correct", "incorrect");
  feedback.textContent = "";
  input.disabled = false;
  nextBtn.style.display = "none";
  startTime = Date.now();
  clearInterval(intervalId);
  timerDisplay.textContent = "0.0";
  accuracyDisplay.textContent = "100";
  intervalId = setInterval(updateTimer, 100);
}

function updateTimer() {
  const now = Date.now();
  const elapsed = ((now - startTime) / 1000).toFixed(1);
  timerDisplay.textContent = elapsed;
}

input.addEventListener("input", () => {
  const userText = input.value;

  clickSound.currentTime = 0;
  clickSound.play();

  let correct = 0;
  for (let i = 0; i < userText.length; i++) {
    if (userText[i] === currentText[i]) correct++;
  }

  const accuracy = userText.length === 0 ? 100 : ((correct / userText.length) * 100).toFixed(0);
  accuracyDisplay.textContent = accuracy;

  if (currentText.startsWith(userText)) {
    input.classList.add("correct");
    input.classList.remove("incorrect");
    feedback.textContent = "✅ Keep going!";

    if (userText === currentText) {
      feedback.textContent = "🎉 Great job! You typed it perfectly!";
      input.disabled = true;
      nextBtn.style.display = "inline-block";
    }

  } else {
    input.classList.remove("correct");
    input.classList.add("incorrect");
    feedback.textContent = "❌ Oops! Check your letters.";
  }

  highlightKey(userText[userText.length - 1]);
});

function highlightKey(char) {
  document.querySelectorAll(".key").forEach(key => key.classList.remove("active"));
  const key = document.querySelector(`.key[data-key="${char?.toLowerCase()}"]`);
  if (key) key.classList.add("active");
}

function handleNext() {
  score += 10;
  document.getElementById("score").textContent = score;
  updateProgress();

  if (score >= level * 50) {
    level++;
    document.getElementById("level").textContent = level;
    showMascotLevelUp();
  }

  saveHighScore();
  nextBtn.style.display = "none";
  loadNextSentence();
}

function updateProgress() {
  const percent = (score % 50) * 2;
  document.getElementById("progressBar").style.width = `${percent}%`;
}

function showMascotLevelUp() {
  const popup = document.getElementById("mascotLevelPopup");
  const sound = document.getElementById("levelUpSound");

  popup.classList.remove("hidden");
  sound.play();

  setTimeout(() => {
    popup.classList.add("hidden");
  }, 3000);
}

function saveHighScore() {
  if (score > highScore) {
    localStorage.setItem("highScore", score);
    document.getElementById("highScore").textContent = score;
    highScore = score;
  }
}

window.onload = loadNextSentence;
