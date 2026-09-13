import { Link } from "react-router-dom";
import {
  Brain,
  Upload,
  Mic,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import InterviewCategories from "./InterviewCategories";


export default function Home() {
  return (
    <>
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* Background Glow */}

      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-[170px]" />
      <div className="absolute top-52 right-0 h-[450px] w-[450px] rounded-full bg-indigo-600/20 blur-[200px]" />
      <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-purple-600/20 blur-[180px]" />

      {/* Navbar */}

      <nav className="fixed top-0 left-0 w-full z-50 bg-transparent shadow-2xl">
  <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">
    
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
        <Brain size={24} />
      </div>

      <div>
        <h1 className="text-xl font-bold text-white">
          AI Interview Copilot
        </h1>

        <p className="text-xs text-gray-300">
          Crack Interviews with AI
        </p>
      </div>
    </div>

    <div className="hidden md:flex gap-10 text-white">
      <a href="#" className="hover:text-cyan-400 transition">
        Home
      </a>

      <a href="/about" className="hover:text-cyan-400 transition">
        About
      </a>

      <a href="#" className="hover:text-cyan-400 transition">
        Dashboard
      </a>

      <a href="#" className="hover:text-cyan-400 transition">
        Contact
      </a>
    </div>

    <button className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold hover:scale-105 transition">
      Login
    </button>

  </div>
</nav>

      {/* Hero */}

      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-40">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 text-cyan-300">

              <Sparkles size={16} />

              AI Powered Career Assistant

            </div>

            <h1 className="mt-8 text-6xl leading-tight font-bold">

              Crack Your

              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                {" "}Dream Job

              </span>

              <br />

              with AI

            </h1>

            <p className="mt-8 text-lg text-gray-400 leading-8 max-w-xl">

              Upload your resume, practice AI-generated interviews,
              improve communication skills and receive ATS feedback
              instantly.

            </p>

            <div className="mt-10 flex gap-5">

              <Link
                to="/upload"
                className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold flex items-center gap-3 hover:scale-105 transition"
              >
                <Upload size={20} />

                Upload Resume

              </Link>

              <Link
                to="/interview"
                className="rounded-full border border-white/20 bg-white/5 px-8 py-4 flex items-center gap-3 hover:bg-white/10 transition"
              >
                <Mic size={20} />

                Start Interview

              </Link>

            </div>

            <div className="mt-14 flex gap-14">

              <div>

                <h2 className="text-4xl font-bold text-cyan-400">
                  20K+
                </h2>

                <p className="text-gray-400 mt-2">
                  Interviews
                </p>

              </div>

              <div>

                <h2 className="text-4xl font-bold text-cyan-400">
                  96%
                </h2>

                <p className="text-gray-400 mt-2">
                  Success Rate
                </p>

              </div>

              <div>

                <h2 className="text-4xl font-bold text-cyan-400">
                  15K+
                </h2>

                <p className="text-gray-400 mt-2">
                  Users
                </p>

              </div>

            </div>

          </div>

          {/* Right Dashboard */}

          <div className="relative">

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl">

              <div className="flex justify-between items-center">

                <h2 className="text-xl font-bold">
                  AI Dashboard
                </h2>

                <div className="w-3 h-3 rounded-full bg-green-400" />

              </div>

              <div className="mt-8 space-y-6">

                <div className="rounded-2xl bg-white/5 p-5">

                  <div className="flex justify-between">

                    <span>ATS Score</span>

                    <span className="text-cyan-400 font-bold">
                      91%
                    </span>

                  </div>

                  <div className="mt-4 h-3 rounded-full bg-gray-700">

                    <div className="h-3 w-[91%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />

                  </div>

                </div>

                <div className="rounded-2xl bg-white/5 p-5">

                  <div className="flex justify-between">

                    <span>Communication</span>

                    <span className="text-green-400">
                      Excellent
                    </span>

                  </div>

                </div>

                <div className="rounded-2xl bg-white/5 p-5">

                  <div className="flex justify-between">

                    <span>Technical Skills</span>

                    <span className="text-cyan-400">
                      React • Node • Python
                    </span>

                  </div>

                </div>

                <button className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-semibold flex justify-center items-center gap-2 hover:scale-105 transition">

                  View Full Report

                  <ArrowRight size={18} />

                </button>

              </div>

            </div>

            <div className="absolute -top-8 -right-8 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-5">

              <h3 className="text-sm text-gray-300">
                AI Feedback
              </h3>

              <h2 className="mt-2 text-3xl font-bold text-green-400">
                9.4/10
              </h2>

            </div>

          </div>

        </div>

      </section>
       
    </div>
    <div>

    </div>
    <InterviewCategories/>
    </>
  );
}




