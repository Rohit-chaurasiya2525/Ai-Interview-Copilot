// src/pages/About.jsx

import {
  Brain,
  FileSearch,
  MessageSquareText,
  Mic,
  Gauge,
  Lightbulb,
  FileDown,
  BarChart3,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function About() {
  const features = [
    {
      icon: FileSearch,
      color: "from-cyan-500 to-blue-500",
      title: "Resume Analysis",
      description:
        "Upload your resume and let AI analyze every important section like an experienced recruiter.",
      items: [
        "Skills Detection",
        "Projects Analysis",
        "Experience",
        "Education",
        "Strengths",
        "Weaknesses",
      ],
    },
    {
      icon: MessageSquareText,
      color: "from-purple-500 to-pink-500",
      title: "AI Interview Questions",
      description:
        "Generate personalized interview questions directly from your resume.",
      items: [
        "Easy",
        "Medium",
        "Hard",
        "Behavioral",
        "Coding",
      ],
    },
    {
      icon: Mic,
      color: "from-emerald-500 to-green-500",
      title: "Voice Interview",
      description:
        "Practice interviews naturally using your voice with AI-powered conversations.",
      items: [
        "🎤 Record Voice",
        "Whisper Speech-to-Text",
        "LLM Processing",
        "Next AI Question",
      ],
    },
    {
      icon: Gauge,
      color: "from-orange-500 to-red-500",
      title: "Answer Evaluation",
      description:
        "Receive detailed feedback after every answer with AI scoring.",
      items: [
        "Accuracy",
        "Confidence",
        "Technical Knowledge",
        "Communication",
        "Overall Score",
      ],
    },
    {
      icon: Lightbulb,
      color: "from-yellow-400 to-orange-500",
      title: "AI Suggestions",
      description:
        "Improve your interview performance with personalized recommendations.",
      items: [
        "Speak Slower",
        "Add Examples",
        "Explain Architecture",
        "Improve Confidence",
        "Deep Technical Answers",
      ],
    },
    {
      icon: FileDown,
      color: "from-indigo-500 to-blue-600",
      title: "Interview Report",
      description:
        "Generate a professional PDF report after every interview session.",
      items: [
        "Questions",
        "Answers",
        "Score",
        "Suggestions",
        "Strengths & Weaknesses",
      ],
    },
    {
      icon: BarChart3,
      color: "from-pink-500 to-rose-500",
      title: "Dashboard",
      description:
        "Track your interview journey and monitor improvement over time.",
      items: [
        "Total Interviews",
        "Average Score",
        "Highest Score",
        "Weak Areas",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#3b82f640,transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#9333ea30,transparent_35%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-cyan-300">
            <Sparkles size={18} />
            AI Powered Interview Platform
          </div>

          <h1 className="mt-8 text-5xl md:text-7xl font-black leading-tight">
            Ace Every
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              {" "}
              Interview
            </span>
          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-lg text-gray-400 leading-8">
            From resume analysis to AI-generated interview questions,
            voice interviews, smart evaluation, PDF reports and progress
            tracking — everything you need to prepare for your dream job.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 hover:border-cyan-500/40 hover:-translate-y-2 transition duration-300"
              >
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color}`}
                >
                  <Icon size={28} />
                </div>

                <h2 className="mt-6 text-2xl font-bold">
                  {feature.title}
                </h2>

                <p className="mt-3 text-gray-400 leading-7">
                  {feature.description}
                </p>

                <div className="mt-6 space-y-3">
                  {feature.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-cyan-400"
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Workflow */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="rounded-3xl bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-purple-600/10 border border-cyan-500/20 p-10">

          <h2 className="text-4xl font-bold text-center">
            AI Interview Workflow
          </h2>

          <div className="grid md:grid-cols-7 gap-6 mt-14 text-center">

            {[
              "Upload Resume",
              "AI Analysis",
              "Generate Questions",
              "Voice Interview",
              "Answer Evaluation",
              "AI Suggestions",
              "Download Report",
            ].map((step, index) => (
              <div key={index}>
                <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-xl font-bold">
                  {index + 1}
                </div>

                <p className="mt-4 text-gray-300">
                  {step}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* AI Evaluation */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-10">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-3xl font-bold mb-8">
              AI Evaluation Score
            </h2>

            {[
              ["Accuracy", 82],
              ["Confidence", 76],
              ["Technical", 91],
              ["Communication", 74],
              ["Overall", 81],
            ].map(([name, score], i) => (
              <div key={i} className="mb-6">
                <div className="flex justify-between mb-2">
                  <span>{name}</span>
                  <span>{score}%</span>
                </div>

                <div className="h-3 rounded-full bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-600"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-3xl font-bold mb-8">
              AI Suggestions
            </h2>

            <div className="space-y-5">
              {[
                "Speak slower while answering.",
                "Mention real project examples.",
                "Explain JWT in depth.",
                "Describe project architecture.",
                "Improve confidence during introductions.",
              ].map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl bg-slate-800/50 p-4"
                >
                  <Lightbulb className="text-yellow-400 mt-1" />
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-center text-gray-400">
        <Brain className="mx-auto mb-4 text-cyan-400" size={34} />
        <p>
          Built with React • Tailwind CSS • FastAPI • Whisper • LLM • ReportLab
        </p>
      </footer>
    </div>
  );
}