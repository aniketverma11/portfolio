import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFreelance from "@/components/ContactFreelance";
import AboutFreelance from "@/components/AboutFreelance";
import { getProjects, getPersonalData } from '@/lib/api';
import { Project, PersonalData } from '@/lib/types';
import { projects as fallbackProjects, personalData as fallbackPersonalData } from '@/lib/data';
import { Globe, Github, ExternalLink, Code2, X, ArrowRight, Briefcase, GraduationCap, Users, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
    const [projects, setProjects] = useState<Project[]>(fallbackProjects as Project[]);
    const [personalData, setPersonalData] = useState<PersonalData>(fallbackPersonalData as PersonalData);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        const root = window.document.documentElement;
        if (selectedProject) {
            root.classList.add('no-scroll');
        } else {
            root.classList.remove('no-scroll');
        }
        return () => { root.classList.remove('no-scroll'); };
    }, [selectedProject]);

    useEffect(() => {
        async function fetchData() {
            try {
                const [projectsData, personalDataRes] = await Promise.all([
                    getProjects(),
                    getPersonalData()
                ]);
                setProjects(projectsData);
                setPersonalData(personalDataRes);
            } catch (error) {
                console.error('Failed to fetch freelance data', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const freelanceProjects = projects.filter(p => p.project_type === 'freelance');

    return (
        <main className="page-shell min-h-screen text-slate-900">
            <Navbar />

            {/* Freelance Hero */}
            <div className="relative pt-32 pb-24 px-4 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-50/80 to-transparent -z-10" />
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
                            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-blue-700">Digital Architecture & Consulting</span>
                        </div>
                        <h1 className="section-title mb-6 text-5xl font-bold text-slate-950 md:text-8xl leading-[1.05] tracking-tight">
                            Building Scalable <br /> <span className="text-blue-600">Solutions</span>
                        </h1>
                        <p className="mx-auto mb-10 max-w-2xl text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                            I help businesses scale from MVP to mass market with high-performance engineering, strategic technical guidance, and advanced AI systems.
                        </p>

                        {/* Tech Stack Pills */}
                        {personalData.core_tech_stack && personalData.core_tech_stack.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-3xl mx-auto">
                                <p className="w-full text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Technologies I'm using nowadays</p>
                                {personalData.core_tech_stack.map((tech, i) => (
                                    <span 
                                        key={tech} 
                                        className="rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-sm px-5 py-2 text-xs font-bold text-slate-700 shadow-sm transition-all hover:border-blue-600 hover:text-blue-600"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            <div id="projects" className="relative px-4 pb-24">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold text-slate-950 tracking-tight">Freelance Portfolio</h2>
                        <div className="h-px flex-1 bg-slate-200 mx-8 hidden md:block" />
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-900 border-t-transparent"></div>
                        </div>
                    ) : freelanceProjects.length === 0 ? (
                        <div className="text-center py-20 flex flex-col items-center surface-card rounded-[2.5rem] bg-white border border-slate-200">
                            <div className="h-24 w-24 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                                <Code2 className="h-12 w-12 text-slate-300" />
                            </div>
                            <p className="text-2xl font-semibold text-slate-400 tracking-tight">Freelance projects coming soon</p>
                            <p className="text-slate-500 mt-2">I am currently updating this section with recent works.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {freelanceProjects.map((project, index) => (
                                <motion.div
                                    key={index}
                                    layoutId={`project-freelance-${index}`}
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
                                                <Briefcase className="h-12 w-12 text-slate-200" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="rounded-full bg-blue-600 px-4 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-white shadow-lg backdrop-blur-sm">
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
                                            <div className="flex items-center text-xs font-bold uppercase tracking-widest text-blue-600 group-hover:text-blue-700 transition-colors">
                                                Explore Impact <ArrowRight className="ml-2 h-3.5 w-3.5" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <AboutFreelance data={personalData} />

            {/* Guidance Section */}
            <div id="guidance" className="bg-slate-900 py-24 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px] -z-0" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl">
                        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-4">Advisory & Mentorship</p>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Expert Guidance for Startups & Developers</h2>
                        <div className="grid md:grid-cols-2 gap-12 mt-16">
                            <div className="space-y-6">
                                <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center">
                                    <Lightbulb className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold">Strategic Consulting</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Helping startups navigate the complex technical landscape. From selecting the right tech stack to architecting scalable systems from day one. 
                                    I provide deep technical audits and roadmapping to ensure long-term success.
                                </p>
                            </div>
                            <div id="teaching" className="space-y-6">
                                <div className="h-12 w-12 rounded-2xl bg-emerald-600 flex items-center justify-center">
                                    <GraduationCap className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold">Technical Teaching</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Conducting workshops and one-on-one sessions for engineering teams and students. 
                                    Focusing on modern backend patterns, AI integration, and production-grade software development practices.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[3000] flex flex-col items-center justify-start bg-slate-950/40 p-4 md:p-8 backdrop-blur-md overflow-y-auto overscroll-contain">
                        <motion.div
                            layoutId={`project-freelance-${freelanceProjects.indexOf(selectedProject)}`}
                            className="relative w-full max-w-3xl my-8 rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl overflow-hidden shrink-0"
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
                                        <Briefcase className="h-24 w-24 text-slate-200" />
                                    </div>
                                )}
                            </div>

                            <div className="p-10 md:p-14">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                                        <Briefcase size={16} />
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
                                    <h4 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Stack Used</h4>
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
                                            className="flex items-center justify-center gap-3 rounded-full bg-blue-600 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-xl"
                                        >
                                            <ExternalLink size={16} /> View Engagement
                                        </a>
                                    )}
                                    <a 
                                        href="#contact" 
                                        onClick={() => setSelectedProject(null)}
                                        className="flex items-center justify-center gap-3 rounded-full border border-slate-200 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-900 transition-all hover:border-slate-950 hover:bg-slate-50"
                                    >
                                        Discuss Similar Project
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                        <div className="absolute inset-0 -z-10" onClick={() => setSelectedProject(null)} />
                    </div>
                )}
            </AnimatePresence>

            <ContactFreelance data={personalData} />
            <Footer />
        </main>
    );
}
