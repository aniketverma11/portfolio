import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
    { name: "Home", href: "/#hero" },
    { name: "Skills", href: "/#skills" },
    { name: "Experience", href: "/#experience" },
    { name: "Projects", href: "/#projects" },
    { name: "Certifications", href: "/certifications" },
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
        
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <nav
            className={`fixed top-0 w-full z-[1000] transition-all duration-300 ${scrolled
                ? "border-b border-slate-200 bg-white/95 py-3 backdrop-blur-xl"
                : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center relative z-10">
                <Link to="/" className="flex items-center gap-2 group">
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
                            to={link.href}
                            className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-slate-900 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                    <a
                        href="#contact"
                        className="rounded-full border border-slate-900 px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-950 transition-colors hover:bg-slate-900 hover:text-white"
                    >
                        Let&apos;s Talk
                    </a>
                </div>

                <div className="md:hidden flex items-center">
                    <button
                        className="text-slate-900 transition-colors hover:text-slate-600"
                        onClick={() => setIsOpen(true)}
                    >
                        <Menu className="w-8 h-8" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 1, x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-0 z-[2000] h-screen w-screen flex flex-col items-center justify-center bg-white"
                    >
                        <div className="absolute top-0 left-0 w-full p-5 px-4 flex justify-between items-center border-b border-slate-100">
                            <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                                <span className="font-mono text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">&lt;/&gt;</span>
                                <span className="font-mono text-lg font-semibold text-slate-950">aniket.verma</span>
                            </Link>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="h-12 w-12 flex items-center justify-center rounded-full bg-slate-100 text-slate-950 hover:bg-slate-200 transition-all"
                            >
                                <X className="w-7 h-7" />
                            </button>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-10">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="font-mono text-3xl font-extrabold tracking-tight text-slate-950 transition-colors hover:text-slate-500"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
