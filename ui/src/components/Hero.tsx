import React, { useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { ChevronDown, Brain, Bot, Sparkles, Cpu, MapPin } from "lucide-react";
import { SiPython, SiLangchain, SiOpenai, SiAnthropic, SiFastapi } from "react-icons/si";
import { PersonalData } from "@/lib/types";

const floatingIcons = [
    { icon: <SiPython />, className: "text-[#3776AB]", top: "12%", left: "5%", size: "w-14 h-14 lg:w-20 lg:h-20", iconSize: "text-2xl lg:text-4xl", duration: 5, label: "Python" },
    { icon: <SiLangchain />, className: "text-[#1C3C3C]", top: "68%", left: "8%", size: "w-16 h-16 lg:w-[5.5rem] lg:h-[5.5rem]", iconSize: "text-3xl lg:text-5xl", duration: 6, label: "LangChain" },
    { icon: <SiOpenai />, className: "text-slate-900", top: "15%", right: "5%", size: "w-14 h-14 lg:w-[4.5rem] lg:h-[4.5rem]", iconSize: "text-2xl lg:text-4xl", duration: 5.5, label: "OpenAI" },
    { icon: <Brain />, className: "text-purple-500", top: "72%", right: "8%", size: "w-16 h-16 lg:w-24 lg:h-24", iconSize: "text-3xl lg:text-5xl", duration: 7, label: "AI/ML" },
    { icon: <Sparkles />, className: "text-amber-500", top: "6%", right: "22%", size: "w-12 h-12 lg:w-16 lg:h-16", iconSize: "text-xl lg:text-3xl", duration: 4, label: "Magic" },
    { icon: <Bot />, className: "text-blue-500", top: "82%", left: "28%", size: "w-14 h-14 lg:w-20 lg:h-20", iconSize: "text-2xl lg:text-4xl", duration: 6.5, label: "Agents" },
    { icon: <SiAnthropic />, className: "text-[#D97757]", top: "42%", left: "2%", size: "w-12 h-12 lg:w-16 lg:h-16", iconSize: "text-xl lg:text-3xl", duration: 5.2, label: "Anthropic" },
    { icon: <SiFastapi />, className: "text-[#05998B]", top: "48%", right: "3%", size: "w-14 h-14 lg:w-[4.5rem] lg:h-[4.5rem]", iconSize: "text-2xl lg:text-4xl", duration: 5.8, label: "FastAPI" },
];

function DraggableIcon({ item, idx, containerRef }: { item: typeof floatingIcons[0]; idx: number; containerRef: React.RefObject<HTMLDivElement | null> }) {
    const [isDragging, setIsDragging] = useState(false);
    const [hasAppeared, setHasAppeared] = useState(false);
    const controls = useAnimationControls();

    // Start the floating animation after initial appearance
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setHasAppeared(true);
            controls.start({
                opacity: 1,
                scale: 1,
                transition: { 
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                }
            });
        }, 300 + idx * 150);
        return () => clearTimeout(timer);
    }, [idx, controls]);

    return (
        // Outer wrapper: positioned absolutely, handles the CSS float animation
        <div
            style={{
                position: 'absolute',
                top: item.top,
                left: item.left,
                right: item.right,
                animation: hasAppeared && !isDragging
                    ? `iconFloat${idx % 4} ${item.duration}s ease-in-out ${idx * 0.4}s infinite`
                    : 'none',
            }}
        >
            {/* Inner draggable element */}
            <motion.div
                drag
                dragConstraints={containerRef}
                dragElastic={0.3}
                dragMomentum={true}
                dragTransition={{ bounceStiffness: 200, bounceDamping: 15 }}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                initial={{ opacity: 0, scale: 0 }}
                animate={controls}
                whileHover={{ scale: 1.2, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                whileDrag={{ scale: 0.9, boxShadow: "0 30px 60px rgba(0,0,0,0.2)", zIndex: 50 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                    cursor: isDragging ? 'grabbing' : 'grab',
                    touchAction: 'none',
                }}
                className={`flex flex-col items-center justify-center gap-1 rounded-2xl lg:rounded-3xl bg-white/90 p-3 lg:p-5 backdrop-blur-xl border border-slate-200/80 shadow-xl hover:shadow-2xl select-none ${item.size} ${item.className} transition-shadow duration-300`}
            >
                <span className={`${item.iconSize} pointer-events-none`}>{item.icon}</span>
                <span className="text-[8px] lg:text-[10px] font-bold uppercase tracking-wider text-slate-400 pointer-events-none">{item.label}</span>
            </motion.div>
        </div>
    );
}

export default function Hero({ data }: { data: PersonalData }) {
    const personalData = data;
    const containerRef = useRef<HTMLDivElement>(null);
    return (
        <section
            id="hero"
            className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24"
        >
            {/* Background elements & Floating Icons */}
            <div ref={containerRef} className="absolute inset-0 z-0">
                <div className="absolute left-1/2 top-24 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-slate-200/70 blur-3xl" />
                
                {floatingIcons.map((item, idx) => (
                    <DraggableIcon
                        key={idx}
                        item={item}
                        idx={idx}
                        containerRef={containerRef}
                    />
                ))}

                <div className="absolute bottom-16 left-16 h-40 w-40 rounded-full border border-slate-300/70 bg-white/70" />
                <div className="absolute right-16 top-28 h-56 w-56 rounded-3xl border border-slate-300/70 bg-slate-100/80" />
            </div>

            <div className="container relative z-10 mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="container-frame mx-auto max-w-6xl rounded-[2.5rem] px-6 py-10 sm:px-10 lg:px-16"
                >
                    <div className="grid gap-12 lg:grid-cols-[1.45fr_0.9fr] lg:items-center">
                        <div>
                            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-slate-300 bg-white/90 px-4 py-2">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                                    Available for engineering roles
                                </span>
                            </div>

                            <p className="section-kicker mb-4">Senior Software Engineer</p>
                            <h1 className="section-title mb-6 text-4xl font-semibold leading-tight text-slate-950 sm:text-6xl lg:text-7xl">
                                {personalData.name}
                            </h1>
                            <h2 className="mb-4 max-w-3xl text-xl font-semibold text-slate-700 sm:text-2xl">
                                {personalData.tagline || personalData.role}
                            </h2>
                            {personalData.location && (
                                <div className="mb-6 flex items-center gap-2 text-slate-500 font-medium">
                                    <MapPin className="h-4 w-4" />
                                    <span>{personalData.location}</span>
                                </div>
                            )}
                            <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                                {personalData.mission}
                            </p>

                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <a
                                    href="#projects"
                                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-slate-800"
                                >
                                    View Projects
                                </a>
                                <a
                                    href="#contact"
                                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-900 transition-colors hover:border-slate-900"
                                >
                                    Contact Me
                                </a>
                            </div>
                        </div>

                        <div className="surface-card rounded-[2rem] p-7 border border-slate-200">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                        Snapshot
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-5 pt-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-900 text-white">
                                            <Cpu className="h-3.5 w-3.5" />
                                        </div>
                                        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">Current focus</p>
                                    </div>
                                    <p className="text-sm leading-6 text-slate-700 font-medium">
                                        Corporate AI Agents, workflow automation, and backend systems.
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 border border-slate-200 text-slate-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4-4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
                                        </div>
                                        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">Working style</p>
                                    </div>
                                    <p className="text-sm leading-6 text-slate-700 font-medium">
                                        Product-minded execution emphasizing scalability and delivery.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400 mb-3">Core technology stack</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {["Python", "LangChain", "FastAPI", "PostgreSQL", "React", "Docker"].map(tech => (
                                                <span key={tech} className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-bold text-slate-700 shadow-sm">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 flex items-center justify-between">
                                        <div>
                                            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400 mb-0.5">Primary Deliverable</p>
                                            <p className="text-sm font-bold text-slate-900 tracking-tight">Scalable Business Systems</p>
                                        </div>
                                        <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-400"
            >
                <ChevronDown className="w-8 h-8" />
            </motion.div>
        </section>
    );
}
