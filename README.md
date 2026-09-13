# 🤖 AI Interview Copilot

An AI-powered interview preparation platform designed to help students and job seekers prepare for technical and HR interviews.

The platform analyzes resumes, generates personalized interview questions, and provides an interactive environment for practicing interviews.

---

## 🚀 Features

### 📄 Resume Analysis
- Upload your resume and get AI-powered analysis.
- Extract important skills, projects, and experience.
- Identify strengths and areas for improvement.
- Generate an ATS-style resume evaluation.

### 🧠 AI Interview Questions
- Generate personalized interview questions based on your resume.
- Supports different difficulty levels:
  - Easy
  - Medium
  - Hard
- Questions can be generated according to your skills and projects.

### 💻 Technical Interview Practice
- Practice technical interview questions.
- Prepare according to your technical skills and projects.
- Improve your problem-solving and interview performance.

### 👔 HR Interview Practice
- Practice commonly asked HR interview questions.
- Prepare answers for behavioral and situational questions.
- Improve communication and confidence.

### 🎤 Interview Practice Environment
- Interactive interview practice interface.
- Microphone testing and voice-based interaction.
- Designed to simulate a real interview environment.

### 📊 Personalized Feedback
- Analyze interview answers.
- Identify strengths and weaknesses.
- Get suggestions for improving future answers.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3

### Backend
- Python
- FastAPI
- Uvicorn

### AI
- Groq API
- LLM-based resume analysis
- AI-generated interview questions

### Development Tools
- Git
- GitHub
- VS Code

---

## 📁 Project Structure

```text
AI-Interview-Copilot/
│
├── Backend/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── requirements.txt
│   │
│   ├── routers/
│   │   └── resume.py
│   │
│   └── services/
│       ├── __init__.py
│       └── llm.py
│
├── Fronted/
│   └── vite-project/
│       ├── public/
│       ├── src/
│       │   ├── pages/
│       │   ├── assets/
│       │   ├── App.jsx
│       │   ├── App.css
│       │   └── main.jsx
│       │
│       ├── package.json
│       ├── package-lock.json
│       └── vite.config.js
│
├── .gitignore
└── README.md
