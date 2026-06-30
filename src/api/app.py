from flask import Flask, render_template, request, jsonify
import pandas as pd
import joblib
from pathlib import Path

app = Flask(
    __name__,
    template_folder="../templates",
    static_folder="../static"
)

BASE_DIR = Path(__file__).resolve().parents[2]
MODEL_PATH = BASE_DIR / "model" / "heart_risk_model.pkl"

loaded = joblib.load(MODEL_PATH)
model = loaded["model"]
FEATURES = loaded["features"]

@app.route("/")
def home():
    return render_template("index.html")

# API endpoint for predicting heart disease risk
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        sample = pd.DataFrame([data])

        # Reindex the sample DataFrame to match the training features
        sample = sample.reindex(columns=FEATURES, fill_value=0)

        # Predict the probability of heart disease
        prob = float(model.predict_proba(sample)[0][1])
        
        # Determine risk level based on probability
        if prob < 0.20:
            risk = "Low"
        elif prob < 0.50:
            risk = "Moderate"
        else:
            risk = "High"
        
        return jsonify({
            "probability": prob,
            "risk": risk
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
if __name__ == "__main__":
    app.run(debug=True)