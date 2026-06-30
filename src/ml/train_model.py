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