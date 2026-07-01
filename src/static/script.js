// Attention overlay
document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("attentionOverlay");
    const mainContent = document.getElementById("mainContent");
    const okButton = document.getElementById("attentionOkBtn");

    // Show overlay
    overlay.classList.remove("hidden");
    mainContent.classList.add("hidden");

    okButton.addEventListener("click", function () {
        overlay.classList.add("hidden");
        mainContent.classList.remove("hidden");

        // Save to localStorage so it doesn't show again
        localStorage.setItem("attentionShown", "true");
    });

    // Check if the overlay has been shown before
    if (localStorage.getItem("attentionShown") === "true") {
        overlay.classList.add("hidden");
        mainContent.classList.remove("hidden");
    }
});
