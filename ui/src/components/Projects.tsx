import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, X, Github, ExternalLink, ArrowRight, Code2 } from "lucide-react";
import { Project } from "@/lib/types";
import { Link } from "react-router-dom";

export default function Projects({ data }: { data: Project[] }) {
    const projects = data.slice(0, 6); // Priority 6
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section id="projects" className="relative py-24 bg-slate-50/50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                                <Code2 className="h-6 w-6" />
                            </div>
                            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                                Engineering Portfolio
                            </p>
                        </div>
                        <h2 className="section-title text-4xl font-semibold text-slate-950 md:text-5xl leading-[1.1]">
                            Projects built for scale and business impact
                        </h2>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link 
                            to="/projects" 
                            className="group inline-flex items-center gap-2 rounded-full border border-slate-900 px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-950 transition-all hover:bg-slate-900 hover:text-white"
                        >
                            View All Projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>

                {/* Mobile Horizontal Scroll / Desktop Grid */}
                <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto pb-8 md:pb-0 snap-x hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            layoutId={`project-home-${index}`}
                            onClick={() => setSelectedProject(project)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex-none w-[85vw] md:w-auto snap-center surface-card group relative flex cursor-pointer flex-col overflow-hidden rounded-[2.5rem] transition-all hover:shadow-2xl hover:-translate-y-2 border border-slate-200"
                        >
                            <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                                {project.image_url ? (
                                    <img 
                                        src={project.image_url} 
                                        alt={project.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <Code2 className="h-12 w-12 text-slate-200" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-slate-950/0 transition-colors group-hover:bg-slate-950/5" />
                                <div className="absolute top-4 left-4">
                                    <span className="rounded-full bg-white/95 px-4 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-slate-500 shadow-sm backdrop-blur-sm">
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col justify-between flex-1">
                                <div className="mb-6">
                                    <h3 className="section-title mb-4 text-2xl font-bold text-slate-950 leading-tight">
                                        {project.title}
                                    </h3>
                                    <p className="line-clamp-3 text-sm leading-7 text-slate-600">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.slice(0, 4).map(t => (
                                            <span key={t} className="rounded-full border border-slate-100 bg-slate-50 px-3 py-1 text-[10px] font-mono font-bold text-slate-700">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">
                                        Explore Case Study <ArrowRight className="ml-2 h-3.5 w-3.5" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal / Expanded View */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-md">
                        <motion.div
                            layoutId={`project-home-${projects.indexOf(selectedProject)}`}
                            className="relative w-full max-w-3xl overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl"
                        >
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
                                className="absolute right-6 top-6 z-10 h-12 w-12 flex items-center justify-center rounded-full bg-white/80 text-slate-500 backdrop-blur-sm transition-all hover:bg-slate-950 hover:text-white shadow-lg"
                            >
                                <X size={24} />
                            </button>

                            <div className="relative aspect-video overflow-hidden bg-slate-100">
                                {selectedProject.image_url ? (
                                    <img 
                                        src={selectedProject.image_url} 
                                        alt={selectedProject.title}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <Code2 className="h-24 w-24 text-slate-200" />
                                    </div>
                                )}
                            </div>

                            <div className="p-10 md:p-14">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                                        <Globe size={16} />
                                    </div>
                                    <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{selectedProject.category}</span>
                                </div>

                                <h3 className="section-title mb-6 text-4xl font-bold text-slate-950 md:text-5xl leading-tight">
                                    {selectedProject.title}
                                </h3>

                                <p className="mb-10 text-lg leading-relaxed text-slate-600">
                                    {selectedProject.description}
                                </p>

                                <div className="mb-10">
                                    <h4 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Core Technologies</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.tech.map(t => (
                                            <span key={t} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-mono font-bold text-slate-700">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    {selectedProject.link && (
                                        <a 
                                            href={selectedProject.link} 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-3 rounded-full bg-slate-950 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all hover:bg-slate-800 hover:scale-105 active:scale-95 shadow-xl"
                                        >
                                            <ExternalLink size={16} /> Visit Product
                                        </a>
                                    )}
                                    <a 
                                        href="#" 
                                        className="flex items-center justify-center gap-3 rounded-full border border-slate-200 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-900 transition-all hover:border-slate-950 hover:bg-slate-50"
                                    >
                                        <Github size={16} /> Codebase
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
