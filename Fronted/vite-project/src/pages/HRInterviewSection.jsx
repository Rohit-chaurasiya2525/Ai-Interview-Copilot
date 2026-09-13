import { ArrowRight, PlayCircle, CheckCircle2 } from "lucide-react";

export default function HRInterviewSection() {
  return (
    <section className="relative bg-[#050816] py-28 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute right-20 bottom-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

        {/* Left Side */}

        <div>

          <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-cyan-400 text-sm">
            AI HR Interview
          </span>

          <h2 className="mt-6 text-5xl font-bold leading-tight text-white">
            Practice HR Interviews
            <span className="text-cyan-400"> Like a Real Recruiter</span>
          </h2>

          <p className="mt-6 text-lg text-gray-400 leading-8">
            Talk with our AI interviewer in real time. Improve your
            communication skills, confidence, body language and interview
            performance with personalized feedback after every session.
          </p>

          <div className="mt-10 space-y-5">

            <div className="flex items-center gap-4">
              <CheckCircle2 className="text-cyan-400" />
              <span>Real-time AI conversation</span>
            </div>

            <div className="flex items-center gap-4">
              <CheckCircle2 className="text-cyan-400" />
              <span>Voice & text interview support</span>
            </div>

            <div className="flex items-center gap-4">
              <CheckCircle2 className="text-cyan-400" />
              <span>Instant AI feedback & ATS insights</span>
            </div>

            <div className="flex items-center gap-4">
              <CheckCircle2 className="text-cyan-400" />
              <span>Confidence & communication score</span>
            </div>

          </div>

          <button className="mt-12 flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold hover:scale-105 transition">
            Start HR Interview
            <ArrowRight size={18} />
          </button>

        </div>

        {/* Right Side */}

        <div className="relative">

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-2xl">

            <video
              autoPlay
              muted
              loop
              playsInline
              className="rounded-3xl w-full"
            >
              <source
                src="https://remasto-avatars-v1.blr1.cdn.digitaloceanspaces.com/website/image/home-page/Homepage_GIF.mp4"
                type="video/mp4"
              />
            </video>

          </div>

          {/* Floating Card */}

          <div className="absolute -bottom-8 -left-8 rounded-2xl border border-white/10 bg-[#111827]/90 backdrop-blur-xl p-5 shadow-xl">

            <div className="flex items-center gap-3">

              <PlayCircle className="text-cyan-400" />

              <div>

                <h4 className="font-semibold text-white">
                  Live AI Interview
                </h4>

                <p className="text-sm text-gray-400">
                  Voice Enabled
                </p>

              </div>

            </div>

          </div>

          {/* Score Card */}

          <div className="absolute -top-8 -right-6 rounded-2xl border border-white/10 bg-[#111827]/90 px-6 py-4 backdrop-blur-xl">

            <p className="text-sm text-gray-400">
              AI Score
            </p>

            <h2 className="text-3xl font-bold text-cyan-400">
              9.8/10
            </h2>

          </div>

        </div>

      </div>
    </section>
  );
}