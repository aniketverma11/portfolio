"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function ServiceForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";
            // Ensure we don't end with double slash
            const cleanBaseUrl = apiBaseUrl.endsWith("/") ? apiBaseUrl.slice(0, -1) : apiBaseUrl;

            const response = await fetch(`${cleanBaseUrl}/service-query/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", subject: "", message: "" });
                // Reset to idle after 5 seconds
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setStatus("error");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="surface-card relative overflow-hidden rounded-[1.75rem] p-8"
        >
            <div className="relative z-10">
                <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                        <Send className="h-5 w-5 text-slate-700" />
                    </div>
                    <div>
                        <h3 className="section-title text-xl font-semibold text-slate-950">Project Enquiry</h3>
                        <p className="font-mono text-xs tracking-[0.18em] text-slate-500">START A CONVERSATION</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="ml-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Name</label>
                            <input
                                required
                                type="text"
                                placeholder="Your name"
                                className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-slate-900"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="ml-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Email</label>
                            <input
                                required
                                type="email"
                                placeholder="you@company.com"
                                className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-slate-900"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="ml-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Subject</label>
                        <input
                            required
                            type="text"
                            placeholder="Role, project, or collaboration topic"
                            className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-slate-900"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="ml-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Message</label>
                        <textarea
                            required
                            rows={4}
                            placeholder="Share the context, team need, or problem you want to solve."
                            className="w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-slate-900"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                    </div>

                    <button
                        disabled={status === "loading"}
                        type="submit"
                        className={`relative flex w-full items-center justify-center gap-3 rounded-full py-4 font-semibold uppercase tracking-[0.16em] transition-all ${status === "success"
                                ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                                : status === "error"
                                    ? "border border-red-200 bg-red-50 text-red-600"
                                    : "bg-slate-950 text-white hover:bg-slate-800"
                            }`}
                    >
                        {status === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
                        {status === "success" && <CheckCircle2 className="w-5 h-5" />}
                        {status === "error" && <AlertCircle className="w-5 h-5" />}

                        <span className="relative z-10">
                            {status === "success"
                                ? "Message Sent"
                                : status === "loading"
                                    ? "Sending..."
                                    : status === "error"
                                        ? "Submission Failed"
                                        : "Send Message"}
                        </span>

                        {status === "idle" && (
                            <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        )}
                    </button>

                    {status === "success" && (
                        <p className="text-center font-mono text-[10px] text-emerald-600">
                            Your enquiry was submitted successfully.
                        </p>
                    )}
                </form>
            </div>
        </motion.div>
    );
}
