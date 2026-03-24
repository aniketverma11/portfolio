
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProjects } from '@/lib/api';
import { Project } from '@/lib/types';
import { projects as fallbackProjects } from '@/lib/data';
import { Globe, Github, ExternalLink, Code2, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>(fallbackProjects as Project[]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error('Failed to fetch projects', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    return (
        <main className="page-shell min-h-screen bg-slate-50 text-slate-900">
            <Navbar />

            <div className="relative min-h-screen px-4 pb-20 pt-24">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <p className="section-kicker mb-3">Portfolio</p>
                        <h1 className="section-title mb-6 text-5xl font-semibold text-slate-950 md:text-7xl leading-tight">
                            Engineering Archive
                        </h1>
                        <p className="mx-auto mb-10 max-w-3xl text-xl text-slate-600">
                            A deep dive into the systems, applications, and tools I've built over the years.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-900 border-t-transparent"></div>
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="text-center py-20 flex flex-col items-center">
                            <div className="h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                                <Code2 className="h-12 w-12 text-slate-300" />
                            </div>
                            <p className="text-2xl font-semibold text-slate-400 tracking-tight">Case studies coming soon</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={index}
                                    layoutId={`project-full-${index}`}
                                    onClick={() => setSelectedProject(project)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="surface-card group relative flex cursor-pointer flex-col overflow-hidden rounded-[2.5rem] transition-all hover:shadow-2xl hover:-translate-y-2 border border-slate-200 bg-white"
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
                                                Details <ArrowRight className="ml-2 h-3.5 w-3.5" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[3000] flex justify-center bg-slate-950/40 p-4 md:p-8 backdrop-blur-md overflow-y-auto">
                        <motion.div
                            layoutId={`project-full-${projects.indexOf(selectedProject)}`}
                            className="relative w-full max-w-3xl my-auto rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl overflow-hidden"
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

            <Footer />
        </main>
    );
}
