
import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { Certification } from '@/lib/types';
import { Link } from 'react-router-dom';

export default function Certifications({ data }: { data: Certification[] }) {
    // Only show top 3
    const displayCertifications = data.slice(0, 3);

    if (data.length === 0) return null;

    return (
        <section id="certifications" className="py-24 relative overflow-hidden bg-white">
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
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                                Verified Credentials
                            </p>
                        </div>
                        <h2 className="section-title text-4xl font-semibold text-slate-950 md:text-5xl leading-[1.1]">
                            Industry standard certifications & recognitions
                        </h2>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link 
                            to="/certifications" 
                            className="group inline-flex items-center gap-2 rounded-full border border-slate-900 px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-950 transition-all hover:bg-slate-900 hover:text-white"
                        >
                            View All <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>

                {/* Mobile Horizontal Scroll / Desktop Grid */}
                <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto pb-8 md:pb-0 snap-x hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                    {displayCertifications.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex-none w-[85vw] md:w-auto snap-center surface-card group relative p-6 rounded-[2.5rem] border border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-xl hover:-translate-y-2"
                        >
                            <div className="mb-6 aspect-video overflow-hidden rounded-[1.5rem] border border-slate-100 bg-slate-50 relative">
                                {cert.image_url ? (
                                    <img 
                                        src={cert.image_url} 
                                        alt={cert.name}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <Award className="h-16 w-16 text-slate-200" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-slate-950/0 transition-colors group-hover:bg-slate-950/5" />
                            </div>
                            
                            <div className="space-y-4 px-2">
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
                                        ID: {cert.certification_id || 'VERIFIED'}
                                    </span>
                                    {cert.url && (
                                        <a 
                                            href={cert.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-950 hover:text-white transition-all"
                                        >
                                            <ExternalLink className="h-3.5 w-3.5" />
                                        </a>
                                    )}
                                </div>
                                <div>
                                    <h3 className="section-title text-xl font-extrabold text-slate-900 leading-tight mb-1">
                                        {cert.name}
                                    </h3>
                                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                                        {cert.issued_by}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
