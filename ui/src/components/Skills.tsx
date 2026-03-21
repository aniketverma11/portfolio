import React from "react";
import { motion } from "framer-motion";
import { Cpu, Database, Cloud, Code, Terminal } from "lucide-react";
import { Skill } from "@/lib/types";

const iconMap: Record<string, React.ReactNode> = {
    "Languages": <Code className="w-6 h-6" />,
    "Frameworks & Libraries": <Cpu className="w-6 h-6" />,
    "Cloud & DevOps": <Cloud className="w-6 h-6" />,
    "Databases": <Database className="w-6 h-6" />,
    "AI & Blockchain": <Terminal className="w-6 h-6" />,
};

export default function Skills({ data }: { data: Skill[] }) {
    const skills = data;
    return (
        <section id="skills" className="relative py-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="section-kicker mb-3">Core Stack</p>
                    <h2 className="section-title text-4xl font-semibold text-slate-950 md:text-5xl">
                        Skills I use to ship production software
                    </h2>
                    <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600">
                        Full-stack engineering with a strong backend foundation, cloud delivery, and applied AI systems.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.category}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="surface-card group relative overflow-hidden rounded-[1.5rem] p-6 transition-all"
                        >
                            <div className="flex items-center gap-4 mb-4 relative z-10">
                                <div className="rounded-2xl bg-slate-100 p-3 text-slate-700 transition-colors group-hover:bg-slate-900 group-hover:text-white">
                                    {iconMap[skill.category] || <Cpu />}
                                </div>
                                <h3 className="section-title text-xl font-semibold text-slate-900">
                                    {skill.category}
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-2 relative z-10">
                                {skill.items.map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-mono text-slate-700 transition-colors group-hover:border-slate-300"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
