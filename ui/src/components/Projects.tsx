"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, X, Github, ExternalLink } from "lucide-react";
import { Project } from "@/lib/types";

export default function Projects({ data }: { data: Project[] }) {
    const projects = data;
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section id="projects" className="relative py-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="section-kicker mb-3">Selected Work</p>
                    <h2 className="section-title mb-4 text-4xl font-semibold text-slate-950 md:text-5xl">
                        Projects built for real products and measurable outcomes
                    </h2>
                    <p className="mx-auto max-w-3xl text-base leading-7 text-slate-600">
                        A mix of product engineering, AI-driven systems, and scalable platforms.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            layoutId={`project-${index}`}
                            onClick={() => setSelectedProject(project)}
                            whileHover={{ y: -10 }}
                            className="surface-card group relative flex h-80 cursor-pointer flex-col justify-between overflow-hidden rounded-[1.75rem] p-6 transition-colors"
                        >
                            <div>
                                <span className="mb-4 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
                                    {project.category}
                                </span>
                                <h3 className="section-title mb-3 text-2xl font-semibold text-slate-950">
                                    {project.title}
                                </h3>
                                <p className="line-clamp-4 text-sm leading-7 text-slate-600">
                                    {project.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {project.tech.slice(0, 3).map(t => (
                                    <span key={t} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-mono text-slate-700">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal / Expanded View */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm">
                        <motion.div
                            layoutId={`project-${projects.indexOf(selectedProject)}`}
                            className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl"
                        >
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
                                className="absolute right-4 top-4 z-10 rounded-full border border-slate-200 bg-white p-2 text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-950"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <Globe className="text-slate-500" />
                                    <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{selectedProject.category}</span>
                                </div>

                                <h3 className="section-title mb-6 text-3xl font-semibold text-slate-950 md:text-4xl">
                                    {selectedProject.title}
                                </h3>

                                <p className="mb-8 text-lg leading-8 text-slate-600">
                                    {selectedProject.description}
                                </p>

                                <div className="mb-8">
                                    <h4 className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Tech Stack</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.tech.map(t => (
                                            <span key={t} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-mono text-slate-700">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <a href={selectedProject.link} className="flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-slate-800">
                                        <ExternalLink size={18} /> Visit Project
                                    </a>
                                    <a href="#" className="flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-950">
                                        <Github size={18} /> Code
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                        <div className="absolute inset-0 -z-10" onClick={() => setSelectedProject(null)} />
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
