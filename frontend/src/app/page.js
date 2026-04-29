"use client";

import { useState, useEffect } from "react";
import API from "../lib/api";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";

export default function Home() {
  const [form, setForm] = useState({
    attendance: "",
    study_hours: "",
    assignment_score: "",
    quiz_score: ""
  });

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("student_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const predict = async () => {
    try {
      const res = await API.post("/predict", {
        attendance: Number(form.attendance),
        study_hours: Number(form.study_hours),
        assignment_score: Number(form.assignment_score),
        quiz_score: Number(form.quiz_score)
      });

      const newEntry = {
        ...form,
        ...res.data,
        date: new Date().toLocaleString()
      };

      const updatedHistory = [newEntry, ...history];

      setResult(res.data);
      setHistory(updatedHistory);

      localStorage.setItem("student_history", JSON.stringify(updatedHistory));

    } catch {
      alert("Backend issue");
    }
  };

  const barData = result && {
    labels: ["Attendance", "Study Hours", "Assignment", "Quiz"],
    datasets: [
      {
        label: "Student Metrics",
        data: [
          form.attendance,
          form.study_hours,
          form.assignment_score,
          form.quiz_score
        ]
      }
    ]
  };

  const trendData = {
    labels: history.map((_, i) => `Entry ${i + 1}`),
    datasets: [
      {
        label: "Performance Score",
        data: history.map(h => h.score)
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      
      <h1 className="text-3xl font-bold mb-6">🎓 Student Dashboard</h1>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow w-96">
        <input name="attendance" placeholder="Attendance %" onChange={handleChange} className="border p-2 w-full mb-2"/>
        <input name="study_hours" placeholder="Study Hours" onChange={handleChange} className="border p-2 w-full mb-2"/>
        <input name="assignment_score" placeholder="Assignment Score" onChange={handleChange} className="border p-2 w-full mb-2"/>
        <input name="quiz_score" placeholder="Quiz Score" onChange={handleChange} className="border p-2 w-full mb-2"/>

        <button onClick={predict} className="bg-blue-500 text-white w-full py-2 mt-2 rounded">
          Predict
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-2">Prediction</h2>
            <p>🎯 Grade: <b>{result.grade}</b></p>
            <p>📊 Score: <b>{result.score}</b></p>
            <p>⚠️ Risk: <b>{result.risk}</b></p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-2">Metrics</h2>
            <Bar data={barData} />
          </div>

        </div>
      )}

      {/* History + Trend */}
      {history.length > 0 && (
        <div className="mt-8 w-full max-w-4xl">

          <div className="bg-white p-6 rounded-xl shadow mb-6">
            <h2 className="text-xl font-bold mb-2">📈 Trend</h2>
            <Line data={trendData} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-2">📋 History</h2>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th>Date</th>
                  <th>Score</th>
                  <th>Grade</th>
                  <th>Risk</th>
                </tr>
              </thead>

              <tbody>
                {history.map((h, i) => (
                  <tr key={i} className="text-center border-b">
                    <td>{h.date}</td>
                    <td>{h.score}</td>
                    <td>{h.grade}</td>
                    <td>{h.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      )}
    </div>
  );
}