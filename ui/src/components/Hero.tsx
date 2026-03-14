"use client";
import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PersonalData } from "@/lib/types";

export default function Hero({ data }: { data: PersonalData }) {
    const personalData = data;
    return (
        <section
            id="hero"
            className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24"
        >
            <div className="absolute inset-0 z-0">
                <div className="absolute left-1/2 top-24 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-slate-200/70 blur-3xl" />
                <div className="absolute bottom-16 left-16 h-40 w-40 rounded-full border border-slate-300/70 bg-white/70" />
                <div className="absolute right-16 top-28 h-56 w-56 rounded-3xl border border-slate-300/70 bg-slate-100/80" />
            </div>

            <div className="container relative z-10 mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="container-frame mx-auto max-w-6xl rounded-[2rem] px-6 py-14 sm:px-10 lg:px-14"
                >
                    <div className="grid gap-12 lg:grid-cols-[1.45fr_0.9fr] lg:items-end">
                        <div>
                            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-slate-300 bg-white/90 px-4 py-2">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                                    Available for engineering roles
                                </span>
                            </div>

                            <p className="section-kicker mb-4">Senior Software Engineer</p>
                            <h1 className="section-title mb-6 text-4xl font-semibold leading-tight text-slate-950 sm:text-6xl lg:text-7xl">
                                {personalData.name}
                            </h1>
                            <h2 className="mb-6 max-w-3xl text-xl font-semibold text-slate-700 sm:text-2xl">
                                {personalData.tagline || personalData.role}
                            </h2>
                            <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                                {personalData.mission}
                            </p>

                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <a
                                    href="#projects"
                                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-slate-800"
                                >
                                    View Projects
                                </a>
                                <a
                                    href="#contact"
                                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-900 transition-colors hover:border-slate-900"
                                >
                                    Contact Me
                                </a>
                            </div>
                        </div>

                        <div className="surface-card rounded-[1.75rem] p-6">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                                <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                    Engineer Snapshot
                                </span>
                                <span className="rounded-full bg-slate-950 px-3 py-1 font-mono text-[11px] font-medium text-white">
                                    profile.ts
                                </span>
                            </div>

                            <div className="space-y-5 pt-5">
                                <div>
                                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-400">Current focus</p>
                                    <p className="mt-2 text-sm leading-7 text-slate-700">
                                        AI agents, enterprise workflow automation, backend systems, and production-grade web platforms.
                                    </p>
                                </div>
                                <div>
                                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-400">Working style</p>
                                    <p className="mt-2 text-sm leading-7 text-slate-700">
                                        Product-minded execution with strong ownership across architecture, delivery, and performance.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-400">Primary stack</p>
                                        <p className="mt-2 text-sm font-semibold text-slate-900">Python LangChain LangGraph FastAPI</p>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-400">Delivery focus</p>
                                        <p className="mt-2 text-sm font-semibold text-slate-900">Scalable business systems</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-400"
            >
                <ChevronDown className="w-8 h-8" />
            </motion.div>
        </section>
    );
}
