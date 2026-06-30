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