# 🎓 Student Performance Prediction System

An end-to-end Machine Learning project that predicts student academic performance using behavioral and academic indicators. The system provides grade prediction, performance scoring, risk classification, and an interactive dashboard for insights.

---

## 🚀 Features

- 📊 Predict student performance (Grade)
- 📈 Calculate performance score
- ⚠️ Risk classification (Low / Medium / High)
- 📉 Visualize data using charts (Bar + Line)
- 🧠 Track performance trends over time
- 💾 Store prediction history (localStorage)
- 🌐 Full-stack application (FastAPI + Next.js)

---

## 🏗️ Tech Stack

### Backend
- Python
- FastAPI
- Scikit-learn
- Joblib

### Frontend
- Next.js
- React
- Tailwind CSS
- Chart.js

---

## 📂 Project Structure


Student-Performance-Prediction/
│
├── backend/
│ ├── app/
│ │ ├── api/
│ │ ├── models/
│ │ ├── services/
│ ├── ml_models/
│ ├── main.py
│
├── frontend/
│ ├── src/
│ │ ├── app/
│ │ ├── lib/
│
├── README.md


---

## ⚙️ Installation & Setup

### 🔹 Clone Repository

```bash
git clone https://github.com/your-username/student-performance-prediction.git
cd student-performance-prediction
🔹 Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt

uvicorn main:app --reload

👉 Backend runs on: http://127.0.0.1:8000

🔹 Frontend Setup
cd frontend
npm install
npm run dev

👉 Frontend runs on: http://localhost:3000

📊 How It Works
User enters student data (attendance, study hours, etc.)
Data is sent to FastAPI backend
ML model predicts performance
System calculates:
Grade
Score
Risk level
Results displayed on dashboard with charts
📈 Sample Output
Grade: A / B / C
Score: 0–100
Risk: Low / Medium / High
💡 Use Cases
Early identification of weak students
Academic performance tracking
Personalized learning insights
Educational analytics systems
