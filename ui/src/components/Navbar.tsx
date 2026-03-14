"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
    { name: "Home", href: "/#hero" },
    { name: "Skills", href: "/#skills" },
    { name: "Experience", href: "/#experience" },
    { name: "Projects", href: "/#projects" },
    { name: "Blog", href: "/blog" },
    { name: "Results", href: "/#achievements" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "border-b border-slate-200/80 bg-slate-50/90 py-3 backdrop-blur-xl"
                : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="font-mono text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                        &lt;/&gt;
                    </span>
                    <span className="font-mono text-lg font-semibold tracking-tight text-slate-950 transition-colors group-hover:text-slate-700">
                        aniket.verma
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-slate-900 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                    <Link
                        href="#contact"
                        className="rounded-full border border-slate-900 px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-950 transition-colors hover:bg-slate-900 hover:text-white"
                    >
                        Let&apos;s Talk
                    </Link>
                </div>

                <button
                    className="md:hidden text-slate-900 transition-colors hover:text-slate-600"
                    onClick={() => setIsOpen(true)}
                >
                    <Menu className="w-8 h-8" />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-slate-50/95 backdrop-blur-xl"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 text-slate-500 hover:text-slate-950"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="font-mono text-2xl font-semibold text-slate-700 transition-colors hover:text-slate-950"
                            >
                                {link.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
