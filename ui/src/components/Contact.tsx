"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, FileText, ArrowUpRight } from "lucide-react";
import { PersonalData } from "@/lib/types";
import ServiceForm from "./ServiceForm";

export default function Contact({ data }: { data: PersonalData }) {
    const personalData = data;
    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="section-kicker mb-3">Contact</p>
                    <h2 className="section-title mb-6 text-4xl font-semibold text-slate-950 md:text-6xl">
                        Let&apos;s talk about product, platform, or AI engineering work
                    </h2>
                    <p className="mx-auto max-w-2xl text-xl text-slate-600">
                        Open to serious conversations around software engineering, backend systems, and applied AI delivery.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="order-2 lg:order-1">
                        <ServiceForm />
                    </div>

                    <div className="order-1 lg:order-2 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                            <a href={`mailto:${personalData.contact.email}`} className="surface-card group flex flex-col items-center gap-4 rounded-[1.75rem] p-8 text-center transition-all">
                                <Mail className="h-10 w-10 text-slate-600 transition-colors group-hover:text-slate-900" />
                                <h3 className="section-title text-2xl font-semibold text-slate-950">Email</h3>
                                <p className="w-full truncate text-slate-600">{personalData.contact.email}</p>
                            </a>

                            <div className="space-y-4">
                                <a href={personalData.contact.linkedin} target="_blank" rel="noreferrer" className="surface-card group flex items-center justify-between rounded-2xl p-6 transition-all">
                                    <span className="flex items-center gap-4">
                                        <Linkedin className="h-6 w-6 text-slate-500 group-hover:text-slate-900" />
                                        <span className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">LinkedIn</span>
                                    </span>
                                    <ArrowUpRight className="h-4 w-4 text-slate-500" />
                                </a>

                                <a href={personalData.contact.github} target="_blank" rel="noreferrer" className="surface-card group flex items-center justify-between rounded-2xl p-6 transition-all">
                                    <span className="flex items-center gap-4">
                                        <Github className="h-6 w-6 text-slate-500 group-hover:text-slate-900" />
                                        <span className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">GitHub</span>
                                    </span>
                                    <ArrowUpRight className="h-4 w-4 text-slate-500" />
                                </a>

                                {personalData.contact.resumeUrl && (
                                    <a href={personalData.contact.resumeUrl} download className="surface-card group flex items-center justify-between rounded-2xl p-6 transition-all">
                                        <span className="flex items-center gap-4">
                                            <FileText className="h-6 w-6 text-slate-500" />
                                            <span className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">Resume</span>
                                        </span>
                                        <ArrowUpRight className="h-4 w-4 text-slate-500" />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="surface-card rounded-[1.75rem] p-8">
                            <h4 className="mb-4 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">Response Window</h4>
                            <p className="text-sm leading-7 text-slate-600">
                                For relevant opportunities and project discussions, I typically reply within 6 to 12 hours.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
