print("🚀 TRAINING STARTED")

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

# Create synthetic dataset
np.random.seed(42)
n = 200

df = pd.DataFrame({
    "attendance": np.random.randint(50, 100, n),
    "study_hours": np.random.randint(1, 10, n),
    "assignment_score": np.random.randint(40, 100, n),
    "quiz_score": np.random.randint(30, 100, n),
})

print("✅ Data Created")

def label(row):
    score = (row["attendance"] * 0.3 +
             row["study_hours"] * 5 +
             row["assignment_score"] * 0.2 +
             row["quiz_score"] * 0.3)

    if score > 80:
        return "A"
    elif score > 60:
        return "B"
    elif score > 40:
        return "C"
    else:
        return "D"

df["performance"] = df.apply(label, axis=1)

print("✅ Labels Generated")

X = df.drop("performance", axis=1)
y = df["performance"]

model = RandomForestClassifier()
model.fit(X, y)

print("✅ Model Trained")

os.makedirs("ml_models", exist_ok=True)
joblib.dump(model, "ml_models/model.joblib")

print("🎉 MODEL SAVED SUCCESSFULLY")