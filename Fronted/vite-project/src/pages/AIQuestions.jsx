import { useState } from "react";
import axios from "axios";
import { Brain, Sparkles } from "lucide-react";

export default function AIQuestions() {
  const [difficulty, setDifficulty] = useState("Easy");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const resumeText = localStorage.getItem("resume_text");

  const generateQuestions = async () => {
    if (!resumeText) {
      alert("Please upload your resume first.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:8000/generate-questions",
        {
          resume_text: resumeText,
          difficulty: difficulty,
        }
      );

      setQuestions(res.data.questions);
    } catch (err) {
      console.error(err);
      alert("Failed to generate questions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 bg-slate-950 text-white rounded-3xl p-8">

      <div className="max-w-6xl mx-auto">

        <div className="text-center">

          <Brain className="mx-auto text-cyan-400" size={60} />

          <h1 className="text-5xl font-bold mt-5">
            AI Interview Questions
          </h1>

          <p className="text-gray-400 mt-4">
            Generate interview questions based on your uploaded resume.
          </p>

        </div>

        {/* Difficulty */}

        <div className="flex flex-wrap justify-center gap-4 mt-10">

          {["Easy", "Medium", "Hard", "Behavioral", "Coding"].map(
            (level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-6 py-3 rounded-xl transition ${
                  difficulty === level
                    ? "bg-cyan-500"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                {level}
              </button>
            )
          )}

        </div>

        {/* Generate Button */}

        <div className="text-center mt-8">

          <button
            onClick={generateQuestions}
            disabled={loading}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            {loading ? "Generating..." : "Generate Questions"}
          </button>

        </div>

        {/* Questions */}

        {questions.length > 0 && (

          <div className="mt-12 grid md:grid-cols-2 gap-6">

            {questions.map((question, index) => (

              <div
                key={index}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-cyan-500 transition"
              >

                <div className="flex items-center gap-3">

                  <Sparkles className="text-cyan-400" />

                  <h2 className="font-semibold">
                    Question {index + 1}
                  </h2>

                </div>

                <p className="mt-4 text-gray-300">
                  {question}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}