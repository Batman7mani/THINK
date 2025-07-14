const questionsMap = {
  under10: [
    { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
    { question: "Which is a fruit?", options: ["Car", "Banana", "Chair"], answer: "Banana" },
    { question: "Which animal says 'meow'?", options: ["Dog", "Cat", "Cow"], answer: "Cat" },
    { question: "What color is the sun?", options: ["Blue", "Yellow", "Green"], answer: "Yellow" },
    { question: "Which one can fly?", options: ["Ball", "Bird", "Fish"], answer: "Bird" }
  ],
  above10: [
    { question: "What is 12 x 3?", options: ["36", "30", "24"], answer: "36" },
    { question: "What gas do humans breathe in?", options: ["Oxygen", "Nitrogen", "Hydrogen"], answer: "Oxygen" },
    { question: "Which is a verb?", options: ["Run", "Red", "Soft"], answer: "Run" },
    { question: "Who wrote books?", options: ["Einstein", "Shakespeare", "Newton"], answer: "Shakespeare" },
    { question: "Which planet is known as the Red Planet?", options: ["Mars", "Venus", "Jupiter"], answer: "Mars" }
  ]
};

let currentQuestions = [];

document.getElementById("startBtn").onclick = () => {
  document.getElementById("agePopup").classList.remove("hidden");
  document.getElementById("startBtn").style.display = "none";
};

function startQuiz(ageGroup) {
  currentQuestions = questionsMap[ageGroup];
  document.getElementById("agePopup").classList.add("hidden");
  document.getElementById("mascotIntro").classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("mascotIntro").classList.add("hidden");
    loadQuestions();
    document.getElementById("quizForm").classList.remove("hidden");
  }, 3000);
}

function loadQuestions() {
  const container = document.getElementById("questionsContainer");
  container.innerHTML = "";

  currentQuestions.forEach((q, index) => {
    const box = document.createElement("div");
    box.className = "question-box";
    box.innerHTML = `
      <p><strong>Q${index + 1}. ${q.question}</strong></p>
      ${q.options.map(option => `
        <label>
          <input type="radio" name="q${index}" value="${option}" required /> ${option}
        </label><br>
      `).join("")}
    `;
    container.appendChild(box);
  });
}

document.getElementById("quizForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let score = 0;
  currentQuestions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === q.answer) score++;
  });

  const resultBox = document.getElementById("resultBox");
  const message = document.getElementById("resultMessage");

  if (score >= 4) {
    message.innerHTML = `🎉 Yay! You scored ${score}/5<br>You're a THINKING STAR! 🌟`;
  } else {
    message.innerHTML = `💪 You scored ${score}/5<br>Don't worry! Great minds keep trying! 💡`;
  }

  resultBox.classList.remove("hidden");
});
