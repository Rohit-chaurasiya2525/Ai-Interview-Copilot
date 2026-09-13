import {
    Users,
    Code2,
    Brain,
    Network,
    Target,
    BarChart3,
    ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
    {
        title: "HR Interview",
        icon: Users,
        color: "emerald",
        description:
            "Practice HR questions like self-introduction, strengths, weaknesses, salary expectations, and career goals.",
        tags: ["Communication", "Confidence", "Personality"],
    },
    {
        title: "Technical Interview",
        icon: Code2,
        color: "cyan",
        description:
            "AI generates technical questions based on your resume, projects, and technology stack.",
        tags: ["React", "Node.js", "Python"],
    },
    {
        title: "DSA Round",
        icon: Brain,
        color: "violet",
        description:
            "Practice coding problems, algorithms, and data structures with AI explanations.",
        tags: ["Arrays", "Trees", "DP"],
    },
    {
        title: "System Design",
        icon: Network,
        color: "orange",
        description:
            "Prepare low-level and high-level design interviews with practical scenarios.",
        tags: ["HLD", "LLD", "Scalability"],
    },
    {
        title: "Behavioral",
        icon: Target,
        color: "yellow",
        description:
            "Master STAR-based answers for leadership, teamwork, and conflict-resolution questions.",
        tags: ["STAR", "Leadership", "Teamwork"],
    },
    {
        title: "Aptitude Test",
        icon: BarChart3,
        color: "rose",
        description:
            "Sharpen quantitative aptitude, logical reasoning, and verbal ability with AI.",
        tags: ["Quant", "Reasoning", "English"],
    },
];

export default function InterviewCategories() {
    const navigate = useNavigate();
    return (
        <section className="relative py-28 px-6 bg-[#050816] text-white">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}

                <div className="text-center mb-16">

                    <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm">
                        Interview Practice
                    </span>

                    <h2 className="mt-6 text-5xl font-bold">
                        Choose Your
                        <span className="text-cyan-400"> Interview Category</span>
                    </h2>

                    <p className="mt-5 text-gray-400 max-w-2xl mx-auto text-lg">
                        Practice every interview round with AI-powered questions,
                        instant feedback, and detailed performance analysis.
                    </p>

                </div>

                {/* Cards */}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {categories.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:-translate-y-3 hover:border-cyan-400 transition-all duration-300"
                            >
                                <div className="flex items-center justify-between">

                                    <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center">

                                        <Icon size={30} className="text-cyan-400" />

                                    </div>

                                    <ArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />

                                </div>

                                <h3 className="mt-8 text-2xl font-semibold">
                                    {item.title}
                                </h3>

                                <p className="mt-4 text-gray-400 leading-7">
                                    {item.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-6">

                                    {item.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 rounded-full text-sm bg-white/10 border border-white/10"
                                        >
                                            {tag}
                                        </span>
                                    ))}

                                </div>

                                <div className="mt-8 flex items-center justify-between">

                                    <div className="flex gap-4 text-sm text-gray-400">
                                        <span>⭐ 500+</span>
                                        <span>⏱ 20 min</span>
                                    </div>

                                    <button
                                        onClick={() => {
                                            if (item.title === "HR Interview") {
                                                navigate("/hr-interview");
                                            }
                                        }}
                                        className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 text-sm font-semibold hover:scale-105 transition"
                                    >
                                        Start
                                    </button>

                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}