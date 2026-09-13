import {
  Brain,
  Mic,
  ShieldCheck,
  Clock3,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Volume2,
  Star,
} from "lucide-react";

export default function HRInterviewPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden relative">

      {/* ================= Background ================= */}

      <div className="absolute -top-44 -left-32 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[180px]" />
      <div className="absolute top-32 right-0 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[220px]" />
      <div className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-purple-500/20 blur-[180px]" />

      {/* ================= Navbar ================= */}

      <nav className="relative z-20 border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">

              <Brain size={24} />

            </div>

            <div>

              <h2 className="font-bold text-xl">
                AI HR Interview
              </h2>

              <p className="text-sm text-gray-400">
                Practice with AI Recruiter
              </p>

            </div>

          </div>

          <button className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold">
            Dashboard
          </button>

        </div>
      </nav>

      {/* ================= Hero ================= */}

      <section className="relative z-10 max-w-7xl mx-auto px-8 py-20">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-cyan-400">

              <Sparkles size={16} />

              AI Powered Recruiter

            </div>

            <h1 className="mt-8 text-6xl font-bold leading-tight">

              Master Every

              <span className="text-cyan-400">

                {" "}HR Interview

              </span>

            </h1>

            <p className="mt-8 text-lg text-gray-400 leading-8">

              Practice realistic HR interviews with an intelligent AI
              recruiter. Improve your confidence, communication skills,
              personality and receive instant feedback after every answer.

            </p>

            <div className="mt-10 space-y-5">

              <div className="flex items-center gap-4">

                <CheckCircle2 className="text-cyan-400" />

                AI Voice Conversation

              </div>

              <div className="flex items-center gap-4">

                <CheckCircle2 className="text-cyan-400" />

                Personalized HR Questions

              </div>

              <div className="flex items-center gap-4">

                <CheckCircle2 className="text-cyan-400" />

                Communication Analysis

              </div>

              <div className="flex items-center gap-4">

                <CheckCircle2 className="text-cyan-400" />

                AI Feedback Report

              </div>

            </div>

            <div className="mt-12 flex gap-5">

              <button className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 flex items-center gap-3 font-semibold hover:scale-105 transition">

                <Mic />

                Start Interview

              </button>

              <button className="rounded-full border border-white/20 px-8 py-4 hover:bg-white/10 transition">

                Learn More

              </button>

            </div>

          </div>

          {/* Right */}

          <div className="relative">

            <div className="rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-2xl p-4 shadow-2xl">

              <video
                autoPlay
                muted
                loop
                playsInline
                className="rounded-[28px] w-full"
              >
                <source
                  src="https://remasto-avatars-v1.blr1.cdn.digitaloceanspaces.com/website/image/home-page/Homepage_GIF.mp4"
                  type="video/mp4"
                />
              </video>

            </div>

            {/* Floating Card */}

            <div className="absolute -top-6 -right-6 rounded-2xl border border-white/10 bg-[#0d1327]/90 backdrop-blur-xl px-6 py-5">

              <p className="text-sm text-gray-400">

                AI Recruiter

              </p>

              <h2 className="text-3xl font-bold text-green-400">

                Online

              </h2>

            </div>

            {/* Floating */}

            <div className="absolute -left-6 bottom-16 rounded-2xl border border-white/10 bg-[#0d1327]/90 backdrop-blur-xl p-5">

              <div className="flex items-center gap-3">

                <Star className="text-yellow-400" />

                <div>

                  <h3 className="font-bold">

                    9.8 / 10

                  </h3>

                  <p className="text-gray-400 text-sm">

                    AI Rating

                  </p>

                </div>

              </div>

            </div>

            {/* Floating */}

            <div className="absolute right-0 -bottom-8 rounded-2xl border border-white/10 bg-[#0d1327]/90 backdrop-blur-xl px-6 py-5 flex items-center gap-3">

              <Volume2 className="text-cyan-400" />

              Voice Enabled

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}