import React from "react";
import { motion } from "framer-motion";
import { Achievement } from "@/lib/types";

export default function Achievements({ data }: { data: Achievement[] }) {
    const achievements = data;
    return (
        <section id="achievements" className="py-24">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <p className="section-kicker mb-3">Results</p>
                    <h2 className="section-title text-4xl font-semibold text-slate-950 md:text-5xl">
                        Numbers that support the execution
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {achievements.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", bounce: 0.5, delay: index * 0.2 }}
                            className="surface-card rounded-[1.75rem] p-8 text-center transition-colors"
                        >
                            <div className="section-title mb-2 text-6xl font-semibold text-slate-950 md:text-7xl">
                                {item.metric}
                            </div>
                            <div className="mb-4 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                                {item.label}
                            </div>
                            <p className="text-slate-600">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
