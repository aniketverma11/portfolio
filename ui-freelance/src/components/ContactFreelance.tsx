
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Instagram, Twitter, Facebook, Linkedin, Github, Mail, MapPin, CheckCircle2 } from "lucide-react";

interface ContactFreelanceProps {
    data: {
        contact: {
            email: string;
            linkedin: string;
            github: string;
        }
    }
}

export default function ContactFreelance({ data }: ContactFreelanceProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "Freelance Query",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "https://aniketverma.xyz/api";
            const response = await fetch(`${apiBase}/service-query/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", subject: "Freelance Query", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus("error");
        }
    };

    const socials = [
        { icon: Instagram, href: "https://instagram.com/heyitsaniiket", label: "Instagram", id: "heyitsaniiket" },
        { icon: Twitter, href: "https://twitter.com/heyitsaniiket", label: "Twitter", id: "heyitsaniiket" },
        { icon: Facebook, href: "https://facebook.com/aniketverma11", label: "Facebook", id: "aniketverma11" },
        { icon: Linkedin, href: data.contact.linkedin || "https://linkedin.com/in/aniketverma11", label: "LinkedIn", id: "aniketverma11" },
        { icon: Github, href: data.contact.github || "https://github.com/aniketverma11", label: "GitHub", id: "aniketverma11" },
    ];

    return (
        <section id="contact" className="relative py-24 px-4 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Left: Contact Info */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6"
                            >
                                <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700">Get in touch</span>
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl font-bold text-slate-950 mb-6 leading-tight"
                            >
                                Have a project in mind? <br />
                                <span className="text-blue-600">Let's build it together.</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed"
                            >
                                Whether you're looking to build a new product from scratch, scale an existing system, or need technical mentoring, I'm here to help.
                            </motion.p>

                            <div className="space-y-6 mb-12">
                                <a href={`mailto:${data.contact.email}`} className="flex items-center gap-4 group">
                                    <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">Email Me</p>
                                        <p className="text-slate-950 font-medium">{data.contact.email}</p>
                                    </div>
                                </a>
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">Location</p>
                                        <p className="text-slate-950 font-medium">Remote / India</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex flex-wrap gap-4">
                            {socials.map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="h-12 w-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all shadow-lg hover:shadow-blue-500/25"
                                    title={social.label}
                                >
                                    <social.icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="surface-card rounded-[2.5rem] border border-slate-200 bg-slate-50/50 p-8 md:p-12"
                    >
                        {status === "success" ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-10">
                                <div className="h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-950 mb-2">Message Sent!</h3>
                                <p className="text-slate-600">I'll get back to you as soon as possible.</p>
                                <button 
                                    onClick={() => setStatus("idle")}
                                    className="mt-8 text-blue-600 font-bold uppercase tracking-widest text-xs hover:text-blue-700"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-4">Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Your name"
                                            className="w-full rounded-3xl border border-slate-200 bg-white px-6 py-4 text-sm outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 placeholder:text-slate-300"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-4">Email</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="your@email.com"
                                            className="w-full rounded-3xl border border-slate-200 bg-white px-6 py-4 text-sm outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 placeholder:text-slate-300"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-4">Subject</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="What can I help you with?"
                                        className="w-full rounded-3xl border border-slate-200 bg-white px-6 py-4 text-sm outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 placeholder:text-slate-300"
                                        value={formData.subject}
                                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-4">Requirements</label>
                                    <textarea
                                        required
                                        rows={5}
                                        placeholder="Describe your project, timeline, and goals..."
                                        className="w-full rounded-[2rem] border border-slate-200 bg-white px-6 py-4 text-sm outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 placeholder:text-slate-300 resize-none"
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>
                                <button
                                    disabled={status === "loading"}
                                    type="submit"
                                    className="w-full group rounded-full bg-blue-600 py-5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl shadow-blue-600/20 transition-all hover:bg-blue-700 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3"
                                >
                                    {status === "loading" ? "Processing..." : (
                                        <>
                                            Submit Request <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                                {status === "error" && (
                                    <p className="text-center text-xs font-bold text-red-500">Something went wrong. Please try again or email me directly.</p>
                                )}
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
