
from fastapi import FastAPI, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from services.llm import analyze_resume, generate_questions

import shutil
import os
import fitz

from database import engine, SessionLocal
import models
import crud
from schemas import UserCreate, LoginRequest


# =========================================================
# CREATE DATABASE TABLES
# =========================================================

models.Base.metadata.create_all(bind=engine)


# =========================================================
# FASTAPI APP
# =========================================================

app = FastAPI()


# =========================================================
# UPLOAD FOLDER
# =========================================================

UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# DATABASE DEPENDENCY
# =========================================================

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# =========================================================
# HOME API
# =========================================================

@app.get("/")
def home():

    return {
        "message": "Successfully run"
    }


# =========================================================
# REGISTER API
# =========================================================

@app.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    return crud.create_user(
        db,
        user
    )


# =========================================================
# LOGIN API
# =========================================================

@app.post("/login")
def login(
    user: LoginRequest,
    db: Session = Depends(get_db)
):

    return crud.login_user(
        db,
        user.email,
        user.password
    )


# =========================================================
# UPLOAD RESUME
# =========================================================

@app.post("/upload-resume")
async def upload_resume(
    resume: UploadFile = File(...)
):

    try:

        # Check file
        if not resume.filename:
            return {
                "error": "No file selected"
            }

        # Only PDF for now
        if not resume.filename.lower().endswith(".pdf"):
            return {
                "error": "Only PDF files are supported"
            }

        # File path
        file_path = os.path.join(
            UPLOAD_DIR,
            resume.filename
        )

        # Save file
        with open(
            file_path,
            "wb"
        ) as buffer:

            shutil.copyfileobj(
                resume.file,
                buffer
            )

        # =================================================
        # EXTRACT PDF TEXT
        # =================================================

        doc = fitz.open(file_path)

        text = ""

        for page in doc:

            text += page.get_text()

        doc.close()

        # Remove unnecessary spaces
        text = text.strip()

        if not text:

            return {
                "error": "Could not extract text from resume"
            }

        print("\n========== RESUME TEXT ==========")
        print(text[:3000])
        print("==================================\n")

        return {
            "message": "Resume Uploaded Successfully",
            "filename": resume.filename,
            "resume_text": text
        }

    except Exception as e:

        print(
            "Resume Upload Error:",
            str(e)
        )

        return {
            "error": str(e)
        }


# =========================================================
# RESUME ANALYSIS
# =========================================================

class ResumeRequest(BaseModel):

    resume_text: str


@app.post("/analyze-resume")
def analyze(
    data: ResumeRequest
):

    try:

        if not data.resume_text.strip():

            return {
                "error": "Resume text is empty"
            }

        result = analyze_resume(
            data.resume_text
        )

        return result

    except Exception as e:

        print(
            "Resume Analysis Error:",
            str(e)
        )

        return {
            "error": str(e)
        }


# =========================================================
# GENERATE INTERVIEW QUESTIONS
# =========================================================

class QuestionRequest(BaseModel):

    resume_text: str

    difficulty: str = "Medium"


@app.post("/generate-questions")
def generate_questions_api(
    data: QuestionRequest
):

    try:

        if not data.resume_text.strip():

            return {
                "questions": [],
                "error": "Resume text is empty"
            }

        print(
            "\n========== GENERATING QUESTIONS =========="
        )

        print(
            "Difficulty:",
            data.difficulty
        )

        print(
            "Resume Length:",
            len(data.resume_text)
        )

        result = generate_questions(
            data.resume_text,
            data.difficulty
        )

        print(
            "Generated Questions:",
            result
        )

        print(
            "===========================================\n"
        )

        return result

    except Exception as e:

        print(
            "Question Generation Error:",
            str(e)
        )

        return {
            "questions": [],
            "error": str(e)
        }

