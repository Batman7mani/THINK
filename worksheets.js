// Optional: track download events (or preview modal)
document.querySelectorAll(".download-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    console.log("Worksheet downloaded:", btn.href);
    // Optionally show toast or log usage
  });
});
