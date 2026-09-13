import { useRef, useState } from "react";

export default function MicTest() {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");

  const recognitionRef = useRef(null);

  const startMic = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech Recognition is not supported. Please use Google Chrome."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognitionRef.current = recognition;

    recognition.onstart = () => {
      console.log("MIC STARTED");
      setListening(true);
    };

    recognition.onresult = (event) => {
      let result = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        result += event.results[i][0].transcript;
      }

      console.log("VOICE:", result);
      setText(result);
    };

    recognition.onerror = (event) => {
      console.error("MIC ERROR:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      console.log("MIC ENDED");
      setListening(false);
    };

    try {
      recognition.start();
    } catch (error) {
      console.error("START ERROR:", error);
      setListening(false);
    }
  };

  const stopMic = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    setListening(false);
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-white flex flex-col items-center justify-center gap-6 px-6">

      <h1 className="text-3xl font-bold">
        🎤 Microphone Test
      </h1>

      <p className="text-gray-400">
        Click Start Mic and speak clearly.
      </p>

      <div className="flex gap-4">

        <button
          onClick={startMic}
          disabled={listening}
          className="px-6 py-3 bg-green-600 hover:bg-green-500 disabled:opacity-50 rounded-xl font-semibold"
        >
          {listening
            ? "🎤 Listening..."
            : "🎤 Start Mic"}
        </button>

        <button
          onClick={stopMic}
          disabled={!listening}
          className="px-6 py-3 bg-red-600 hover:bg-red-500 disabled:opacity-50 rounded-xl font-semibold"
        >
          🛑 Stop
        </button>

      </div>

      <div className="w-full max-w-xl min-h-[180px] bg-[#101827] border border-cyan-500/20 p-6 rounded-2xl">

        <h2 className="font-semibold mb-3">
          Detected Speech
        </h2>

        <p className="text-gray-300 leading-7">
          {text || "Speak something..."}
        </p>

      </div>

    </div>
  );
}