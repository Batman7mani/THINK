// Top: phoneme dictionary
const basicPhonemeMap = {
  cat: ['k', 'a', 't'],
  dog: ['d', 'o', 'g'],
  ship: ['sh', 'i', 'p'],
  phone: ['f', 'o', 'n'],
  think: ['th', 'i', 'n', 'k'],
  elephant: ['e', 'l', 'uh', 'f', 'uh', 'n', 't'],
};

// Function to segment and display
function segmentWord() {
  const word = document.getElementById("wordInput").value.trim().toLowerCase();
  const output = document.getElementById("phonemeOutput");
  output.innerHTML = "";

  if (!word) {
    alert("Please enter a word.");
    return;
  }

  const segments = basicPhonemeMap[word] || word.split('');

  segments.forEach((sound, index) => {
    const box = document.createElement("div");
    box.className = `phoneme-box syllable-${index % 4}`;
    box.textContent = sound;

    // Click-to-speak functionality
    box.onclick = () => {
      const utter = new SpeechSynthesisUtterance(sound);
      utter.rate = 0.8;
      speechSynthesis.speak(utter);
    };

    output.appendChild(box);

    // Animation on appearance
    setTimeout(() => {
      box.style.opacity = 1;
      box.style.transform = "scale(1)";
    }, index * 100);
  });
}

function fillExample(word) {
  document.getElementById("wordInput").value = word;
  segmentWord();
}