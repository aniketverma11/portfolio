
import React from "react";
import { motion } from "framer-motion";
import { CircleCheckBig, User } from "lucide-react";
import { PersonalData } from "@/lib/types";

export default function AboutFreelance({ data }: { data: PersonalData }) {
    const personalData = data;
    return (
        <section id="about" className="py-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-blue-50/50 blur-[120px] -z-0" />
            
            <div className="container mx-auto flex flex-col items-center gap-16 px-4 lg:flex-row relative z-10 text-slate-900">
                <div className="flex-1 space-y-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                            {personalData.profile_photo_url && (
                                <motion.img 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    src={personalData.profile_photo_url} 
                                    alt={personalData.name} 
                                    className="h-44 w-44 md:h-56 md:w-56 rounded-[3rem] object-cover ring-8 ring-blue-50 shadow-2xl border-2 border-white"
                                />
                            )}
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-4">
                                    <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700">The Architect</span>
                                </div>
                                <h2 className="section-title text-4xl font-bold text-slate-950 md:text-6xl leading-tight">
                                    Engineering with <br /> <span className="text-blue-600">Precision</span>
                                </h2>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mb-6">
                            {personalData.about.title}
                        </h3>

                        <div className="mb-10 space-y-6 text-lg leading-relaxed text-slate-600">
                            {personalData.about.description.map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {personalData.about.values.map((value, i) => (
                                <div key={i} className="rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-sm p-4 flex items-center gap-3">
                                    <CircleCheckBig className="h-5 w-5 text-emerald-500 shrink-0" />
                                    <span className="font-mono text-sm font-bold uppercase tracking-[0.12em] text-slate-700">{value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="flex-1 flex justify-center relative">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="surface-card w-full max-w-md rounded-[3rem] p-10 bg-slate-900 text-white shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px]" />
                        
                        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
                                Commitment
                            </span>
                            <span className="font-mono text-xs text-white/20 font-bold tracking-widest">EST. 2024</span>
                        </div>
                        
                        <div className="space-y-6">
                            {personalData.about.values.map((value, i) => (
                                <div key={i} className="flex items-start gap-4 p-5 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <span className="mt-1 font-mono text-xs font-bold text-blue-500">
                                        0{i + 1}
                                    </span>
                                    <div>
                                        <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-white">
                                            {value}
                                        </p>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-400 font-medium">
                                            Ensuring every project exceeds expectations and delivers tangible value.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
