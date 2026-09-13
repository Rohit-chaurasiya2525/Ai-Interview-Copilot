import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Mic,
  MicOff,
  Volume2,
  ArrowRight,
  Bot,
  User,
  Loader2,
  RefreshCw,
} from "lucide-react";

export default function Interview() {
  // =====================================================
  // STATES
  // =====================================================

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);

  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const [generatingQuestions, setGeneratingQuestions] = useState(true);
  const [error, setError] = useState("");

  const [difficulty, setDifficulty] = useState("Medium");

  // Speech Recognition reference
  const recognitionRef = useRef(null);

  // Prevent duplicate evaluation
  const evaluatedRef = useRef(false);

  // =====================================================
  // RESUME
  // =====================================================

  const resumeText = localStorage.getItem("resume_text");

  // =====================================================
  // GENERATE QUESTIONS
  // =====================================================

  const generateQuestions = async () => {
    if (!resumeText) {
      setError("Resume not found. Please upload your resume first.");
      setGeneratingQuestions(false);
      return;
    }

    try {
      setGeneratingQuestions(true);
      setError("");

      const response = await axios.post(
        "http://127.0.0.1:8000/generate-questions",
        {
          resume_text: resumeText,
          difficulty: difficulty,
        }
      );

      console.log("AI QUESTIONS RESPONSE:", response.data);

      if (response.data.error) {
        setError(response.data.error);
        return;
      }

      if (
        !response.data.questions ||
        !Array.isArray(response.data.questions) ||
        response.data.questions.length === 0
      ) {
        setError("AI could not generate questions from this resume.");
        return;
      }

      setQuestions(response.data.questions);
      setCurrentIndex(0);
    } catch (err) {
      console.error("QUESTION GENERATION ERROR:", err);

      console.error("SERVER RESPONSE:", err.response?.data);

      setError(
        err.response?.data?.detail ||
          "Failed to generate interview questions."
      );
    } finally {
      setGeneratingQuestions(false);
    }
  };

  // =====================================================
  // INITIAL QUESTION GENERATION
  // =====================================================

  useEffect(() => {
    generateQuestions();

    return () => {
      stopListening();
      stopSpeaking();
    };
  }, []);

  // =====================================================
  // CURRENT QUESTION
  // =====================================================

  const currentQuestion = questions[currentIndex];

  // =====================================================
  // TEXT TO SPEECH
  // =====================================================

  const speakQuestion = () => {
    if (!currentQuestion) return;

    if (!("speechSynthesis" in window)) {
      alert("Text-to-Speech is not supported.");
      return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(currentQuestion);

    speech.lang = "en-US";
    speech.rate = 0.9;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  };

  // =====================================================
  // AUTO SPEAK QUESTION
  // =====================================================

  useEffect(() => {
    if (!currentQuestion) return;

    const timer = setTimeout(() => {
      speakQuestion();
    }, 500);

    return () => {
      clearTimeout(timer);
      stopSpeaking();
    };
  }, [currentIndex, currentQuestion]);

  // =====================================================
  // STOP SPEAKING
  // =====================================================

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  // =====================================================
  // START LISTENING
  // =====================================================

  const startListening = () => {
    console.log("START SPEAKING CLICKED");

    // Browser support
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech Recognition is not supported in this browser. Please use Google Chrome."
      );
      return;
    }

    // Stop question voice
    stopSpeaking();

    // Stop previous recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.log("Previous recognition already stopped.");
      }

      recognitionRef.current = null;
    }

    const recognition = new SpeechRecognition();

    recognitionRef.current = recognition;

    // =================================================
    // IMPORTANT SETTINGS
    // =================================================

    recognition.lang = "en-US";

    // Keep microphone active
    recognition.continuous = true;

    // Show partial speech
    recognition.interimResults = true;

    recognition.maxAlternatives = 1;

    evaluatedRef.current = false;

    setTranscript("");
    setFeedback(null);
    setIsListening(true);

    console.log("Starting microphone...");

    try {
      recognition.start();
    } catch (error) {
      console.error("Recognition start error:", error);
      setIsListening(false);
      return;
    }

    // =================================================
    // START EVENT
    // =================================================

    recognition.onstart = () => {
      console.log("🎤 MICROPHONE STARTED");

      setIsListening(true);
    };

    // =================================================
    // SPEECH RESULT
    // =================================================

    recognition.onresult = (event) => {
      console.log("🎤 Speech detected");

      let finalText = "";
      let interimText = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        const result = event.results[i];

        const text = result[0].transcript;

        if (result.isFinal) {
          finalText += text + " ";
        } else {
          interimText += text;
        }
      }

      const currentText = (
        finalText + interimText
      ).trim();

      console.log("Transcript:", currentText);

      if (currentText) {
        setTranscript((previous) => {
          if (finalText) {
            return (
              previous +
              (previous ? " " : "") +
              finalText.trim()
            );
          }

          return previous || interimText;
        });
      }
    };

    // =================================================
    // ERROR
    // =================================================

    recognition.onerror = (event) => {
      console.error(
        "🎤 SPEECH ERROR:",
        event.error
      );

      // no-speech is NOT a fatal error
      if (event.error === "no-speech") {
        console.log(
          "No speech detected. Microphone is still available."
        );

        return;
      }

      if (event.error === "audio-capture") {
        alert(
          "Microphone not found. Please check your microphone."
        );

        setIsListening(false);
        return;
      }

      if (event.error === "not-allowed") {
        alert(
          "Microphone permission denied. Please allow microphone access in Chrome."
        );

        setIsListening(false);
        return;
      }

      if (event.error === "network") {
        alert(
          "Speech recognition network error. Check your internet connection."
        );

        setIsListening(false);
        return;
      }

      setIsListening(false);
    };

    // =================================================
    // END
    // =================================================

    recognition.onend = () => {
      console.log("🎤 Recognition ended");

      setIsListening(false);

      recognitionRef.current = null;

      // Get final answer
      setTranscript((finalTranscript) => {
        const answer = finalTranscript.trim();

        if (
          answer &&
          !evaluatedRef.current
        ) {
          evaluatedRef.current = true;

          console.log(
            "Final Answer:",
            answer
          );

          evaluateAnswer(answer);
        }

        return finalTranscript;
      });
    };
  };

  // =====================================================
  // STOP LISTENING
  // =====================================================

  const stopListening = () => {
    console.log("STOP SPEAKING CLICKED");

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.log(
          "Recognition already stopped."
        );
      }

      recognitionRef.current = null;
    }

    setIsListening(false);
  };

  // =====================================================
  // EVALUATE ANSWER
  // =====================================================

  const evaluateAnswer = async (answer) => {
    if (!answer || !currentQuestion) {
      return;
    }

    try {
      setLoading(true);
      setFeedback(null);

      console.log(
        "Sending answer to AI..."
      );

      const response = await axios.post(
        "http://127.0.0.1:8000/evaluate-answer",
        {
          question: currentQuestion,
          answer: answer,
          resume_text: resumeText,
        }
      );

      console.log(
        "AI FEEDBACK:",
        response.data
      );

      setFeedback(response.data);
    } catch (error) {
      console.error(
        "EVALUATION ERROR:",
        error
      );

      console.error(
        "SERVER RESPONSE:",
        error.response?.data
      );

      setFeedback({
        score: 0,
        communication: 0,
        technical: 0,
        suggestions: [
          "Answer evaluation API is not connected yet.",
          "Add the /evaluate-answer endpoint in FastAPI.",
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // NEXT QUESTION
  // =====================================================

  const nextQuestion = () => {
    stopListening();
    stopSpeaking();

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(
        (previous) => previous + 1
      );

      setTranscript("");
      setFeedback(null);

      evaluatedRef.current = false;
    } else {
      alert(
        "Interview Completed 🎉"
      );
    }
  };

  // =====================================================
  // RETRY
  // =====================================================

  const retryQuestions = () => {
    setError("");
    generateQuestions();
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (generatingQuestions) {
    return (
      <div className="min-h-screen bg-[#050b14] text-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <Loader2
              size={42}
              className="animate-spin text-cyan-400"
            />
          </div>

          <h1 className="text-2xl font-bold">
            AI is analyzing your resume...
          </h1>

          <p className="text-gray-400 mt-3">
            Generating personalized interview
            questions based on your skills
            and projects.
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error || !questions.length) {
    return (
      <div className="min-h-screen bg-[#050b14] text-white flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <div className="text-6xl mb-6">
            🤖
          </div>

          <h1 className="text-2xl font-bold">
            No Questions Generated
          </h1>

          <p className="text-gray-400 mt-3">
            {error ||
              "AI could not generate questions from your resume."}
          </p>

          <button
            onClick={retryQuestions}
            className="mt-7 flex items-center gap-2 mx-auto px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-semibold"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // PROGRESS
  // =====================================================

  const progress =
    ((currentIndex + 1) /
      questions.length) *
    100;

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="min-h-screen bg-[#050b14] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>
            <div className="flex items-center gap-3">

              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <Bot
                  className="text-cyan-400"
                  size={25}
                />
              </div>

              <h1 className="text-3xl font-bold">
                AI Interview Copilot
              </h1>

            </div>

            <p className="text-gray-400 mt-2">
              Personalized interview based on
              your resume
            </p>
          </div>

          {/* Difficulty */}

          <div className="flex items-center gap-3">

            <span className="text-sm text-gray-400">
              Difficulty
            </span>

            <select
              value={difficulty}
              onChange={(e) => {
                setDifficulty(
                  e.target.value
                );
              }}
              className="bg-[#101827] border border-cyan-500/20 rounded-xl px-4 py-2 text-white outline-none"
            >
              <option value="Easy">
                Easy
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Hard">
                Hard
              </option>
            </select>

          </div>

        </div>

        {/* QUESTION NUMBER */}

        <div className="flex justify-between items-center mb-3">

          <p className="text-gray-400">
            Question{" "}
            <span className="text-cyan-400 font-bold">
              {currentIndex + 1}
            </span>{" "}
            of{" "}
            {questions.length}
          </p>

          <p className="text-cyan-400 text-sm">
            {Math.round(progress)}%
          </p>

        </div>

        {/* PROGRESS */}

        <div className="w-full h-3 rounded-full bg-gray-800 mb-10 overflow-hidden">
          <div
            style={{
              width: `${progress}%`,
            }}
            className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500"
          />
        </div>

        {/* QUESTION */}

        <div className="bg-[#101827] rounded-2xl p-7 border border-cyan-500/20 mb-6">

          <div className="flex items-center justify-between mb-5">

            <div className="flex items-center gap-3">

              <div className="p-2.5 rounded-xl bg-cyan-500/10">
                <Bot
                  className="text-cyan-400"
                  size={28}
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  AI Interviewer
                </h2>

                <p className="text-xs text-gray-500">
                  Resume-based question
                </p>
              </div>

            </div>

            <button
              onClick={speakQuestion}
              className="p-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 transition"
              title="Read question"
            >
              <Volume2 size={20} />
            </button>

          </div>

          <p className="text-xl leading-9 text-gray-100">
            {currentQuestion}
          </p>

        </div>

        {/* ANSWER */}

        <div className="bg-[#101827] rounded-2xl p-7 border border-white/10 mb-6">

          <div className="flex items-center gap-3 mb-5">

            <div className="p-2.5 rounded-xl bg-green-500/10">
              <User
                className="text-green-400"
                size={25}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                Your Answer
              </h2>

              <p className="text-xs text-gray-500">
                Speak your answer using the
                microphone
              </p>
            </div>

          </div>

          <div
            className={`bg-[#080e18] rounded-xl border p-5 min-h-[120px] ${
              isListening
                ? "border-green-500/50"
                : "border-white/5"
            }`}
          >

            {isListening && (
              <div className="flex items-center gap-2 mb-3 text-green-400 text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Microphone is listening...
              </div>
            )}

            <p className="text-gray-300 leading-7">

              {transcript ||
                (isListening
                  ? "Listening... start speaking now."
                  : "Click 'Start Speaking' and answer the question...")}

            </p>

          </div>

        </div>

        {/* MICROPHONE */}

        <div className="flex flex-wrap gap-4 mb-8">

          <button
            onClick={startListening}
            disabled={isListening}
            className="flex items-center gap-3 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl font-semibold transition"
          >

            {isListening ? (
              <>
                <Loader2
                  className="animate-spin"
                  size={20}
                />

                Listening...
              </>
            ) : (
              <>
                <Mic size={20} />

                Start Speaking
              </>
            )}

          </button>

          <button
            onClick={stopListening}
            disabled={!isListening}
            className="flex items-center gap-3 bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl font-semibold transition"
          >

            <MicOff size={20} />

            Stop

          </button>

        </div>

        {/* FEEDBACK */}

        <div className="bg-[#101827] rounded-2xl p-7 border border-cyan-500/20">

          <div className="flex items-center gap-3 mb-6">

            <div className="p-2.5 rounded-xl bg-indigo-500/10">
              🤖
            </div>

            <div>
              <h2 className="text-xl font-bold">
                AI Feedback
              </h2>

              <p className="text-xs text-gray-500">
                AI evaluation of your answer
              </p>
            </div>

          </div>

          {loading && (
            <div className="flex items-center gap-3 text-cyan-400">
              <Loader2
                className="animate-spin"
                size={22}
              />

              <span>
                AI is evaluating your answer...
              </span>
            </div>
          )}

          {!loading && feedback && (
            <>
              <div className="grid md:grid-cols-3 gap-5 mb-7">

                <div className="bg-cyan-500/10 border border-cyan-500/20 p-5 rounded-xl">
                  <p className="text-gray-400 text-sm">
                    Overall Score
                  </p>

                  <p className="text-4xl font-bold text-cyan-400 mt-2">
                    {feedback.score ?? 0}/10
                  </p>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 p-5 rounded-xl">
                  <p className="text-gray-400 text-sm">
                    Communication
                  </p>

                  <p className="text-4xl font-bold text-green-400 mt-2">
                    {feedback.communication ?? 0}/10
                  </p>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 p-5 rounded-xl">
                  <p className="text-gray-400 text-sm">
                    Technical
                  </p>

                  <p className="text-4xl font-bold text-yellow-400 mt-2">
                    {feedback.technical ?? 0}/10
                  </p>
                </div>

              </div>

              <h3 className="text-lg font-semibold mb-4">
                Suggestions
              </h3>

              <ul className="space-y-3">

                {feedback.suggestions?.map(
                  (item, index) => (
                    <li
                      key={index}
                      className="bg-white/5 border border-white/5 rounded-xl p-4 text-gray-300"
                    >
                      <span className="text-cyan-400 mr-2">
                        →
                      </span>

                      {item}
                    </li>
                  )
                )}

              </ul>
            </>
          )}

          {!loading && !feedback && (
            <div className="text-gray-400 bg-white/5 rounded-xl p-5">
              Answer the question to receive
              AI-powered feedback.
            </div>
          )}

        </div>

        {/* NEXT */}

        <div className="flex justify-end mt-8">

          <button
            onClick={nextQuestion}
            disabled={!transcript || loading}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed px-7 py-3 rounded-xl font-semibold transition"
          >

            {currentIndex ===
            questions.length - 1
              ? "Finish Interview"
              : "Next Question"}

            <ArrowRight size={20} />

          </button>

        </div>

      </div>
    </div>
  );
}