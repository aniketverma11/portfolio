
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCertifications } from '@/lib/api';
import { Certification } from '@/lib/types';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CertificationsPage() {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCerts() {
            try {
                const data = await getCertifications();
                setCertifications(data);
            } catch (error) {
                console.error('Failed to fetch certifications', error);
            } finally {
                setLoading(false);
            }
        }
        fetchCerts();
    }, []);

    return (
        <main className="page-shell min-h-screen bg-slate-50 text-slate-900">
            <Navbar />

            <div className="relative min-h-screen px-4 pb-20 pt-24">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <p className="section-kicker mb-3">Recognition</p>
                        <h1 className="section-title mb-6 text-5xl font-semibold text-slate-950 md:text-7xl leading-tight">
                            Official Certifications
                        </h1>
                        <p className="mx-auto mb-10 max-w-3xl text-xl text-slate-600">
                            A curated collection of verified industry credentials and professional accomplishments.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-900 border-t-transparent"></div>
                        </div>
                    ) : certifications.length === 0 ? (
                        <div className="text-center py-20 flex flex-col items-center">
                            <div className="h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                                <Award className="h-12 w-12 text-slate-300" />
                            </div>
                            <p className="text-2xl font-semibold text-slate-400 tracking-tight">Credentials coming soon</p>
                            <p className="mt-2 text-slate-500">I am currently updating my official records.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {certifications.map((cert, index) => (
                                <motion.div
                                    key={cert.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="surface-card group relative p-6 rounded-[2.5rem] border border-slate-200 bg-white hover:shadow-2xl transition-all duration-500"
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
                                                    className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-950 hover:text-white transition-all transform group-hover:rotate-12"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </a>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="section-title text-xl font-extrabold text-slate-900 leading-tight mb-2 group-hover:text-slate-700 transition-colors">
                                                {cert.name}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                                <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
                                                    {cert.issued_by}
                                                </p>
                                            </div>
                                            {cert.issued_date && (
                                                <p className="mt-4 text-xs font-mono font-bold text-slate-400">
                                                    Issued: {new Date(cert.issued_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
}
