
import os
import json

from groq import Groq
from dotenv import load_dotenv


# =========================================================
# LOAD ENVIRONMENT VARIABLES
# =========================================================

load_dotenv()


# =========================================================
# GROQ CLIENT
# =========================================================

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


# =========================================================
# ANALYZE RESUME
# =========================================================

def analyze_resume(resume_text):

    prompt = f"""
You are an expert technical recruiter and ATS evaluator.

Analyze the following resume.

Return ONLY valid JSON.

The JSON format must be exactly:

{{
    "skills": [],
    "projects": [],
    "strengths": [],
    "weaknesses": [],
    "interview_topics": [],
    "ats_score": 85
}}

Rules:

1. ats_score must be an INTEGER between 0 and 100.
2. skills must contain at least 5 items if available.
3. projects must contain at least 2 items if available.
4. strengths must contain at least 3 items.
5. weaknesses must contain at least 3 items.
6. interview_topics must contain at least 5 topics.
7. Return ONLY JSON.
8. Do not use markdown.

Resume:

{resume_text}
"""

    response = client.chat.completions.create(

        model="openai/gpt-oss-120b",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],

        temperature=0.3
    )

    answer = response.choices[0].message.content

    print(
        "\n========== LLM RESPONSE =========="
    )

    print(answer)

    print(
        "==================================\n"
    )

    try:

        cleaned = (
            answer
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        return json.loads(cleaned)

    except Exception as e:

        print(
            "Resume JSON Error:",
            str(e)
        )

        return {
            "error": str(e),
            "raw_response": answer
        }


# =========================================================
# GENERATE INTERVIEW QUESTIONS
# =========================================================

def generate_questions(
    resume_text: str,
    difficulty: str = "Medium"
):

    prompt = f"""
You are an expert technical interviewer.

Read the candidate's resume carefully.

Generate exactly 10 personalized interview questions.

Difficulty: {difficulty}

IMPORTANT RULES:

1. Questions MUST be based on the resume.
2. Ask about projects mentioned in the resume.
3. Ask about technologies mentioned in the resume.
4. Ask about skills mentioned in the resume.
5. Ask technical questions related to the candidate's skills.
6. Ask project deep-dive questions.
7. Ask questions that an actual interviewer would ask.
8. Do NOT ask about technologies that are not present in the resume.
9. Difficulty must match {difficulty}.
10. Generate exactly 10 questions.
11. Return ONLY valid JSON.
12. Do not use markdown.
13. Do not add explanations outside JSON.

JSON FORMAT:

{{
    "questions": [
        "Question 1",
        "Question 2",
        "Question 3",
        "Question 4",
        "Question 5",
        "Question 6",
        "Question 7",
        "Question 8",
        "Question 9",
        "Question 10"
    ]
}}

Candidate Resume:

{resume_text}
"""

    response = client.chat.completions.create(

        model="openai/gpt-oss-120b",

        messages=[
            {
                "role": "system",
                "content": (
                    "You are an expert technical interviewer."
                )
            },
            {
                "role": "user",
                "content": prompt
            }
        ],

        temperature=0.5
    )

    answer = response.choices[0].message.content

    print(
        "\n========== QUESTIONS RESPONSE =========="
    )

    print(answer)

    print(
        "========================================\n"
    )

    try:

        cleaned = (
            answer
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        result = json.loads(cleaned)

        # Make sure questions exist
        if "questions" not in result:

            return {
                "questions": [],
                "error": "GPT response does not contain questions",
                "raw_response": answer
            }

        return result

    except Exception as e:

        print(
            "Question JSON Error:",
            str(e)
        )

        return {
            "questions": [],
            "error": str(e),
            "raw_response": answer
        }

