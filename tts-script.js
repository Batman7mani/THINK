function showInstructions(type) {
  const popup = document.getElementById("instruction-popup");
  const box = document.getElementById("tts-box");

  if (type === "beginner") {
    alert("🧠 Instructions:\n\n1. Type or paste text in the box.\n2. Click the Speak button to hear it.\n3. Enjoy learning at your own pace!");
  } else {
    alert("🎉 Welcome back, Pro Thinker! Keep evolving and helping others!");
  }

  popup.style.display = "none";
  box.style.display = "block";
}

function speakText() {
  const input = document.getElementById('ttsInput').value.trim();
  const voiceSelect = document.getElementById('voiceSelect');
  const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

  if (!input) {
    alert("Please enter some text to speak.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(input);

  // Match selected voice
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices.find(voice => voice.name === selectedVoice);

  speechSynthesis.speak(utterance);

  // After speaking ends, show wrap-up
  utterance.onend = () => {
    const wrapup = document.getElementById('tts-wrapup');
    if (wrapup) {
      wrapup.style.display = 'block';
      wrapup.style.animation = 'fadeInUp 1s ease forwards';
    }
  };
}


document.getElementById("ttsInput").addEventListener("input", function () {
  const text = this.value.trim();
  const words = text === "" ? 0 : text.split(/\s+/).length;
  const chars = text.length;
  document.getElementById("word-count").textContent = `Words: ${words} | Characters: ${chars}`;
});

const voiceSelect = document.getElementById("voiceSelect");

window.speechSynthesis.onvoiceschanged = () => {
  const voices = speechSynthesis.getVoices();
  voiceSelect.innerHTML = voices
    .map((v, i) => `<option value="${i}">${v.name} (${v.lang})</option>`)
    .join("");
};

let totalSpokenWords = 0;

function speakText() {
  const input = document.getElementById("ttsInput").value.trim();
  if (!input) return alert("Please enter some text.");

  const words = input.split(/\s+/).length;
  totalSpokenWords += words;

  const utterance = new SpeechSynthesisUtterance(input);
  const selectedVoice = speechSynthesis.getVoices()[document.getElementById("voiceSelect").value];
  utterance.voice = selectedVoice;
  speechSynthesis.speak(utterance);

  // Update progress bar
  const progressBar = document.getElementById("progressBar");
  const progressCount = document.getElementById("progressCount");
  progressBar.value = Math.min(totalSpokenWords, 100);
  progressCount.textContent = `${Math.min(totalSpokenWords, 100)} / 100 words`;

  utterance.onend = () => {
    document.getElementById("tts-wrapup").style.display = "block";
    document.getElementById("tts-wrapup").style.animation = "fadeInUp 1s ease forwards";
  };
}

function insertPhrase(text) {
  document.getElementById("ttsInput").value = text;
}
