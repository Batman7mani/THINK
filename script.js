function toggleLogin() {
    document.getElementById("loginModal").classList.toggle("hidden");
  }

  // Enable submit button only if consent checked
  const consentBox = document.getElementById("consentCheck");
  const submitBtn = document.getElementById("submitBtn");

  consentBox.addEventListener("change", () => {
    submitBtn.disabled = !consentBox.checked;
  });

  // Handle form (optional)
  document.getElementById("thinkerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Welcome to THINKIT! 🎉");
    toggleLogin();
  });