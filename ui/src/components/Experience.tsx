import React from "react";
import { motion } from "framer-motion";
import { BriefcaseBusiness } from "lucide-react";
import { Experience as ExperienceType } from "@/lib/types";

export default function Experience({ data }: { data: ExperienceType[] }) {
    const experience = data;
    return (
        <section id="experience" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 flex items-start gap-4"
                >
                    <div className="rounded-2xl border border-slate-200 bg-white p-3">
                        <BriefcaseBusiness className="h-8 w-8 text-slate-700" />
                    </div>
                    <div>
                        <p className="section-kicker mb-2">Experience</p>
                        <h2 className="section-title text-4xl font-semibold text-slate-950 md:text-5xl">
                            Work focused on business impact and technical depth
                        </h2>
                        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                            Roles across enterprise applications, AI systems, backend engineering, and platform delivery.
                        </p>
                    </div>
                </motion.div>

                <div className="relative ml-3 space-y-10 border-l-2 border-slate-200 md:ml-6">
                    {experience.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative pl-8 md:pl-12"
                        >
                            <span className="absolute -left-[11px] top-8 h-5 w-5 rounded-full border-4 border-slate-50 bg-slate-900 transition-all group-hover:scale-110" />

                            <div className="surface-card rounded-[1.75rem] p-7">
                                <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-baseline">
                                    <div>
                                        <h3 className="section-title text-2xl font-semibold text-slate-950">
                                            {job.role}
                                        </h3>
                                        <span className="mt-1 block text-sm font-medium text-slate-500">{job.company}</span>
                                    </div>
                                    <span className="md:ml-auto rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                                    {job.period}
                                    </span>
                                </div>

                                <p className="mb-5 max-w-3xl leading-7 text-slate-600">
                                    {job.description}
                                </p>

                                <ul className="space-y-3">
                                    {job.achievements.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-900" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
