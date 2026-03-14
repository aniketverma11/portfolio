"use client";
import React from "react";
import { motion } from "framer-motion";
import { CircleCheckBig } from "lucide-react";
import { PersonalData } from "@/lib/types";

export default function About({ data }: { data: PersonalData }) {
    const personalData = data;
    return (
        <section id="about" className="py-24 relative">
            <div className="container mx-auto flex flex-col items-center gap-12 px-4 md:flex-row">
                <div className="flex-1">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="mb-6 flex items-center gap-4">
                            <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                <CircleCheckBig className="h-10 w-10 text-slate-700" />
                            </div>
                            <div>
                                <p className="section-kicker mb-2">About</p>
                                <h2 className="section-title text-4xl font-semibold text-slate-950 md:text-5xl">
                                    How I approach engineering work
                                </h2>
                            </div>
                        </div>

                        <h3 className="section-title mb-6 text-2xl font-semibold text-slate-900">
                            {personalData.about.title}
                        </h3>

                        <div className="mb-8 space-y-4 text-lg leading-8 text-slate-600">
                            {personalData.about.description.map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {personalData.about.values.map((value, i) => (
                                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4">
                                    <span className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-slate-700">{value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="flex-1 flex justify-center relative">
                    <div className="surface-card w-full max-w-md rounded-[2rem] p-8">
                        <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
                            <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                                Working Principles
                            </span>
                            <span className="font-mono text-xs text-slate-400">01</span>
                        </div>
                        <div className="space-y-5">
                            {personalData.about.values.map((value, i) => (
                                <div key={i} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                                    <span className="mt-1 font-mono text-sm font-semibold text-slate-400">
                                        0{i + 1}
                                    </span>
                                    <div>
                                        <p className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-slate-900">
                                            {value}
                                        </p>
                                        <p className="mt-2 text-sm leading-7 text-slate-600">
                                            Built into how I scope, design, and deliver software for teams and end users.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
