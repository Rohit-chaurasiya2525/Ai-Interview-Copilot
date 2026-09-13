import { useState } from "react";
import axios from "axios";
import AIQuestions from "./AIQuestions";

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);

      // Upload Resume
      const res = await axios.post(
        "http://127.0.0.1:8000/upload-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload Response:", res.data);

      alert(res.data.message);

      setResumeText(res.data.resume_text);
      localStorage.setItem("resume_text", res.data.resume_text);

      // Analyze Resume
      const analysisRes = await axios.post(
        "http://127.0.0.1:8000/analyze-resume",
        {
          resume_text: res.data.resume_text,
        }
      );

      console.log("AI Analysis:", analysisRes.data);

      setAnalysis(analysisRes.data);

    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Dynamic Cyber Tech Background FX */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Futuristic Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(56, 189, 248, 0.3) 1px, transparent 0)`,
            backgroundSize: "32px 32px"
          }}
        ></div>

        {/* Ambient Neon Glows */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-600/30 via-indigo-600/20 to-purple-600/30 blur-[130px] rounded-full"></div>
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-10 -right-32 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-12">
        
        {/* Header / Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium tracking-widest uppercase shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            AI Neural Engine Active
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
            Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-500">AI Resume</span> Intelligence
          </h1>

          <p className="text-slate-400 text-base sm:text-lg">
            Leverage deep NLP algorithms to evaluate ATS parsing score, extract skill nodes, and prepare custom interview prompts.
          </p>
        </div>

        {/* High-Tech Upload Box */}
        <div className="max-w-xl mx-auto bg-slate-900/60 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>

          <div className="relative">
            <label className="border-2 border-dashed border-slate-700/80 hover:border-cyan-400/80 bg-slate-950/60 hover:bg-slate-950/90 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group/label">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover/label:scale-110 group-hover/label:border-cyan-400 transition-all duration-300 mb-4 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V8m0 0l-3 3m3-3l3 3M17 8v8m0 0l3-3m-3 3l-3-3" />
                </svg>
              </div>

              <p className="text-slate-200 font-semibold text-base group-hover/label:text-cyan-300 transition-colors">
                Drop your resume file or <span className="text-cyan-400 underline decoration-cyan-500/40 underline-offset-4">Browse</span>
              </p>
              <p className="text-slate-500 text-xs mt-1.5 font-mono">
                Supports PDF, DOC, DOCX (Max 10MB)
              </p>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
            </label>

            {/* File Selected Badge */}
            {file && (
              <div className="mt-4 bg-cyan-950/50 border border-cyan-500/40 rounded-xl p-3.5 flex items-center justify-between text-cyan-300 text-sm backdrop-blur-md">
                <div className="flex items-center gap-3 truncate">
                  <span className="p-1.5 bg-cyan-500/20 rounded-lg text-cyan-400">📄</span>
                  <span className="truncate font-mono font-medium">{file.name}</span>
                </div>
                <span className="text-xs text-cyan-400 bg-cyan-500/20 border border-cyan-500/30 px-2.5 py-1 rounded-md font-mono">
                  READY
                </span>
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={handleUpload}
              disabled={loading}
              className="mt-6 w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 active:scale-[0.99] text-white font-bold text-base shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-3 uppercase tracking-wider font-mono"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing Matrix...</span>
                </>
              ) : (
                <>
                  <span>Execute Analysis</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>

        {/* AI Analytics Dashboard */}
        {analysis && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* ATS Score Header Card */}
            <div className="bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-xs font-mono font-semibold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  Analysis Matrix Complete
                </span>
                <h2 className="text-3xl font-extrabold text-white pt-2">AI Optimization Report</h2>
                <p className="text-slate-400 text-sm max-w-lg">
                  Resume scanned successfully. System generated ATS compatibility metrics and actionable insights.
                </p>
              </div>

              {/* Glowing Cyber Score Circle */}
              <div className="relative flex items-center justify-center shrink-0">
                <div className="w-44 h-44 rounded-full bg-slate-950 border border-cyan-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] flex items-center justify-center relative">
                  <svg className="w-full h-full transform -rotate-90 absolute" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="6" className="text-slate-800" fill="transparent" />
                    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="6" className="text-emerald-400" fill="transparent" strokeDasharray="264" strokeDashoffset={264 - (264 * (analysis.ats_score || 0)) / 100} strokeLinecap="round" />
                  </svg>
                  <div className="text-center z-10">
                    <span className="block text-xs font-mono text-slate-400 uppercase tracking-widest">ATS Match</span>
                    <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-emerald-400 font-mono">
                      {analysis.ats_score}
                    </span>
                    <span className="block text-[10px] text-emerald-400/80 font-mono">/ 100 Score</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insights Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Skills Card */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md hover:border-cyan-500/40 transition duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    ⚡
                  </div>
                  <h3 className="text-lg font-bold text-white">Extracted Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 px-3 py-1 rounded-lg text-xs font-mono font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects Card */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md hover:border-indigo-500/40 transition duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    🚀
                  </div>
                  <h3 className="text-lg font-bold text-white">Key Projects</h3>
                </div>
                <ul className="space-y-2">
                  {analysis.projects?.map((project, index) => (
                    <li key={index} className="bg-slate-950/50 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs font-sans">
                      {project}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interview Topics Card */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md hover:border-amber-500/40 transition duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    🎯
                  </div>
                  <h3 className="text-lg font-bold text-white">Interview Topics</h3>
                </div>
                <ul className="space-y-2">
                  {analysis.interview_topics?.map((topic, index) => (
                    <li key={index} className="bg-slate-950/50 border border-slate-800 rounded-xl p-3 text-slate-300 text-xs font-sans">
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Strengths Card */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md hover:border-emerald-500/40 transition duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    ✅
                  </div>
                  <h3 className="text-lg font-bold text-white">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {analysis.strengths?.map((item, index) => (
                    <li key={index} className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3 text-emerald-200 text-xs font-sans">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses Card */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md hover:border-rose-500/40 transition duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    ⚠️
                  </div>
                  <h3 className="text-lg font-bold text-white">Areas for Improvement</h3>
                </div>
                <ul className="space-y-2">
                  {analysis.weaknesses?.map((item, index) => (
                    <li key={index} className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-3 text-rose-200 text-xs font-sans">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        )}

        {/* Extracted Text Output Card */}
        {resumeText && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400">⚡</span> Raw Extracted Data
              </h2>
              <span className="text-[10px] text-cyan-400 font-mono bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded">
                PARSED OK
              </span>
            </div>

            <div className="bg-slate-950/90 border border-slate-800/80 rounded-2xl p-4 sm:p-6 max-h-80 overflow-auto font-mono text-xs text-slate-300 leading-relaxed scrollbar-thin scrollbar-thumb-slate-800">
              <pre className="whitespace-pre-wrap">{resumeText}</pre>
            </div>
          </div>
        )}

        {/* AI Questions Child Component */}
        {resumeText && (
          <div>
            <AIQuestions resumeText={resumeText} />
          </div>
        )}

      </div>
    </div>
  );
}