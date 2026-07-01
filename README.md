# Heart Failure Mortality Risk Prediction

A machine learning–based Clinical Decision Support System (CDSS) for estimating the risk of mortality in patients with heart failure using clinical records.

**Disclaimer**

> This application is intended for educational and research purposes only.
> It is a clinical decision support tool and **must not** be used as a substitute for professional medical judgment, diagnosis, or treatment.

---

## Overview

This project predicts the probability of mortality in heart failure patients using routinely collected clinical features.

The application provides:

- Estimated mortality probability
- Three-level risk assessment (Low / Moderate / High)

---

## Dataset

This project uses the **Heart Failure Clinical Records** dataset from the **UCI Machine Learning Repository**.

The dataset contains clinical records of **299 patients** with heart failure and is designed for predicting whether a patient died during the follow-up period.

For the complete dataset description, feature definitions, citation, and download, visit the official UCI repository:
[Heart Failure Clinical Records Dataset](https://archive.ics.uci.edu/dataset/519/heart+failure+clinical+records)

### Features Used

The model is trained using the following clinical variables:

- Age
- Anaemia
- Creatinine Phosphokinase
- Diabetes
- Ejection Fraction
- High Blood Pressure
- Platelets
- Serum Creatinine
- Serum Sodium
- Sex
- Smoking

> **Note:** The `time` feature is intentionally excluded from training because it represents the follow-up duration and is not available when making predictions for new patients.

---

## Machine Learning

The application automatically evaluates multiple machine learning algorithms using Stratified Cross Validation.

Currently evaluated:

- Logistic Regression
- Random Forest

The best-performing model is automatically selected and saved.

### Model Evaluation

| Metric     | Value                              |
| ---------- | ---------------------------------- |
| Best Model | Random Forest                      |
| ROC-AUC    | **0.7895**                         |
| Validation | Stratified 5-Fold Cross Validation |

---

## Risk Levels

The predicted probability is mapped into three clinical risk categories:

| Probability | Risk Level    |
| ----------- | ------------- |
| <20%        | Low Risk      |
| 20–50%      | Moderate Risk |
| >50%        | High Risk     |

---

## Technologies

- Python
- Flask
- Scikit-learn
- Pandas
- Joblib
- HTML
- CSS
- Vanilla JS

---

## Installation

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## Train the Model

```bash
python src/ml/train_model.py
```

The trained model will be saved to:

```
model/heart_risk_model.pkl
```

---

## Run the Web Application

```bash
python src/api/app.py
```

Open your browser:

```
http://127.0.0.1:5000
```

---

## License

This project is licensed under the [MIT License](./LICENCE).