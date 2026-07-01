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

        try {
            // Send data to the server
            const response = await fetch("/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.error) {
                resultBox.innerHTML = `<div style="color:red;">${result.error}</div>`;
                return;
            }

            let color = "#28a745";
            let icon = "🟢";
            let message = "Low Risk - Continue routine care";

            // risk levels
            if (result.risk === "Moderate") {
                color = "#ffc107";
                icon = "🟡";
                message = "Moderate Risk - Recommend follow-up and monitoring";
            }

            if (result.risk === "High") {
                color = "#dc3545";
                icon = "🔴";
                message =
                    "High Risk - Immediate cardiology consultation advised";
            }

            resultBox.innerHTML = `
                <div style="
                    padding:20px;
                    border-radius:15px;
                    background:${color};
                    color:white;
                    text-align:center;
                    margin-top:20px;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                ">
                    <div style="font-size:40px;">${icon}</div>
                    <h2>${result.risk} Risk</h2>
                    <h1>${(result.probability * 100).toFixed(1)}%</h1>
                    <p style="margin-top:10px;">${message}</p>
                </div>
            `;
        } catch (err) {
            console.error(err);
            resultBox.innerHTML = `<div style="color:red;">Server error</div>`;
        }
    });