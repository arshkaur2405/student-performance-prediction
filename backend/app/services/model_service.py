import joblib
import numpy as np

model = joblib.load("ml_models/model.joblib")

def calculate_score(data):
    return (
        data.attendance * 0.3 +
        data.study_hours * 5 +
        data.assignment_score * 0.2 +
        data.quiz_score * 0.3
    )

def get_risk(score):
    if score < 50:
        return "High Risk"
    elif score < 70:
        return "Medium Risk"
    else:
        return "Low Risk"

def predict_performance(data):
    input_data = np.array([[
        data.attendance,
        data.study_hours,
        data.assignment_score,
        data.quiz_score
    ]])

    prediction = model.predict(input_data)[0]
    score = calculate_score(data)
    risk = get_risk(score)

    return {
        "grade": prediction,
        "score": round(score, 2),
        "risk": risk
    }