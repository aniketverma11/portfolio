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

                            <div className="surface-card relative overflow-hidden rounded-[2.5rem] p-8 md:p-10 border border-slate-200 bg-white transition-all hover:shadow-2xl hover:-translate-y-1">
                                {/* Company Background Image Overlay */}
                                {job.company_logo_url && (
                                    <div className="absolute top-0 right-0 h-full w-1/3 opacity-[0.1] transition-opacity group-hover:opacity-[0.2]">
                                        <img 
                                            src={job.company_logo_url} 
                                            alt="" 
                                            className="h-full w-full object-contain object-right grayscale pointer-events-none"
                                        />
                                    </div>
                                )}

                                <div className="relative z-10">
                                    <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center">
                                        {job.company_logo_url && (
                                            <div className="h-16 w-16 shrink-0 rounded-2xl border border-slate-100 bg-white p-2 shadow-sm flex items-center justify-center">
                                                <img 
                                                    src={job.company_logo_url} 
                                                    alt={job.company}
                                                    className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                                                />
                                            </div>
                                        )}
                                        
                                        <div className="flex-1">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div>
                                                    <h3 className="section-title text-2xl font-bold text-slate-950 md:text-3xl leading-tight">
                                                        {job.role}
                                                    </h3>
                                                    <span className="mt-1 block text-lg font-medium text-slate-500">{job.company}</span>
                                                </div>
                                                <span className="rounded-full border border-slate-200 bg-white px-5 py-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-slate-600 shadow-sm">
                                                    {job.period}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid lg:grid-cols-12 gap-10">
                                        <div className="lg:col-span-12">
                                            <p className="mb-8 max-w-4xl text-lg leading-8 text-slate-600">
                                                {job.description}
                                            </p>

                                            <div className="space-y-4">
                                                <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Key Deliverables</h4>
                                                <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                                                    {job.achievements.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-4 text-sm leading-7 text-slate-700">
                                                            <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full border-2 border-slate-900" />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
