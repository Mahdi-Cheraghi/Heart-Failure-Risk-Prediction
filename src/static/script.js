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

document
    .getElementById("heartForm")
    .addEventListener("submit", async function (e) {
        e.preventDefault();

        const resultBox = document.getElementById("result");

        // show loading
        resultBox.classList.remove("hidden");
        resultBox.innerHTML = "Loading...";

        const data = {
            age: Number(document.getElementById("age").value),
            sex: Number(document.getElementById("sex").value),
            anaemia: Number(document.getElementById("anaemia").value),
            diabetes: Number(document.getElementById("diabetes").value),
            high_blood_pressure: Number(
                document.getElementById("high_blood_pressure").value,
            ),
            smoking: Number(document.getElementById("smoking").value),
            creatinine_phosphokinase: Number(
                document.getElementById("creatinine_phosphokinase").value,
            ),
            ejection_fraction: Number(
                document.getElementById("ejection_fraction").value,
            ),
            platelets: Number(document.getElementById("platelets").value),
            serum_creatinine: Number(
                document.getElementById("serum_creatinine").value,
            ),
            serum_sodium: Number(document.getElementById("serum_sodium").value),
        };
    });
