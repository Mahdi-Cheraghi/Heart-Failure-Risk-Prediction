import pandas as pd
import joblib
from pathlib import Path

from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

# Set the base directory and paths
BASE_DIR = Path(__file__).resolve().parents[2]
DATA_PATH = BASE_DIR / "data" / "heart_failure_clinical_records_dataset.csv"
MODEL_PATH = BASE_DIR / "model" / "heart_risk_model.pkl"

df = pd.read_csv(DATA_PATH)
# Drop rows with missing values
df = df.dropna()

# Drop the "time" column if it exists
if "time" in df.columns:
    df = df.drop(columns=["time"])

# Separate feature and target variable
X = df.drop(columns=["DEATH_EVENT"])
y = df["DEATH_EVENT"]

FEATURES = list(X.columns)

models = {
    "log_reg": Pipeline([
        ("scaler", StandardScaler()),
        ("model", LogisticRegression(max_iter=2000))
    ]),
    "rf": RandomForestClassifier(
        n_estimators=300,
        max_depth=5,
        min_samples_split=5,
        min_samples_leaf=2,
        random_state=42
    )
}

# Setup cross-validation
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

best_model = None
best_score = 0
best_name = ""

for name, model in models.items():
    scores = cross_val_score(model, X, y, cv=cv, scoring="roc_auc")

    mean_score = scores.mean()

    if mean_score > best_score:
        best_score = mean_score
        best_model = model
        best_name = name

# Fit the best model on the entire dataset
best_model.fit(X, y)

# Save the best model
joblib.dump({
    "model": best_model,
    "features": FEATURES
}, MODEL_PATH)