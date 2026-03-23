import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Languages, Globe, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
    { name: "Home", href: "/#hero" },
    { name: "Skills", href: "/#skills" },
    { name: "Experience", href: "/#experience" },
    { name: "Projects", href: "/projects" },
    { name: "Certifications", href: "/certifications" },
    { name: "Blog", href: "/blog" },
    { name: "Results", href: "/#achievements" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
];

const languages = [
    { name: "English", code: "en", flag: "🇺🇸" },
    { name: "Hindi", code: "hi", flag: "🇮🇳" },
    { name: "Spanish", code: "es", flag: "🇪🇸" },
    { name: "French", code: "fr", flag: "🇫🇷" },
    { name: "German", code: "de", flag: "🇩🇪" },
    { name: "Japanese", code: "ja", flag: "🇯🇵" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState(languages[0]);
    const langRef = useRef<HTMLDivElement>(null);
    const mobileLangRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        const handleClickOutside = (event: MouseEvent) => {
            if (langRef.current && !langRef.current.contains(event.target as Node)) {
                setLangOpen(false);
            }
            if (mobileLangRef.current && !mobileLangRef.current.contains(event.target as Node)) {
                setLangOpen(false);
            }
        };
        
        window.addEventListener("scroll", handleScroll);
        document.addEventListener("mousedown", handleClickOutside);
        
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        // Google Translate initialization
        const addGoogleTranslate = () => {
            if (!document.getElementById("google-translate-script")) {
                const script = document.createElement("script");
                script.id = "google-translate-script";
                script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
                document.body.appendChild(script);

                (window as any).googleTranslateElementInit = () => {
                    new (window as any).google.translate.TranslateElement(
                        { 
                            pageLanguage: "en", 
                            includedLanguages: "en,hi,es,fr,de,ja",
                            autoDisplay: false 
                        },
                        "google_translate_element"
                    );
                };
            }
        };
        addGoogleTranslate();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Handle hash scrolling
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace("#", "");
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        }
    }, [location]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("/#")) {
            e.preventDefault();
            const id = href.replace("/#", "");
            
            if (location.pathname === "/") {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", href);
                }
            } else {
                navigate(href);
            }
        }
        setIsOpen(false);
    };

    const changeLanguage = (lang: typeof languages[0]) => {
        setCurrentLang(lang);
        setLangOpen(false);
        
        // Set cookie for persistence (Standard Google Translate format)
        document.cookie = `googtrans=/en/${lang.code}; path=/; domain=${window.location.hostname}`;
        document.cookie = `googtrans=/en/${lang.code}; path=/`;

        const triggerTranslate = () => {
            const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
            if (select) {
                select.value = lang.code;
                select.dispatchEvent(new Event("change"));
                // Trigger it twice for consistency in some browsers
                setTimeout(() => {
                    select.dispatchEvent(new Event("click"));
                }, 100);
            } else {
                // If the widget isn't ready yet, wait and try again
                setTimeout(triggerTranslate, 500);
            }
        };
        
        triggerTranslate();
    };

    return (
        <nav
            className={`fixed top-0 w-full z-[1000] transition-all duration-300 ${scrolled
                ? "border-b border-slate-200 bg-white/95 py-3 backdrop-blur-xl"
                : "bg-transparent py-5"
                }`}
        >
            {/* Hidden Google Translate Element - needs to be in DOM but invisible for script to work */}
            <div id="google_translate_element" style={{ position: 'absolute', top: 0, opacity: 0, pointerEvents: 'none', zIndex: -1 }}></div>
            
            <div className="container mx-auto px-4 flex justify-between items-center relative z-10">
                <Link to="/" className="flex items-center gap-2 group">
                    <span className="font-mono text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                        &lt;/&gt;
                    </span>
                    <span className="font-mono text-lg font-semibold tracking-tight text-slate-950 transition-colors group-hover:text-slate-700">
                        aniket.verma
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-slate-900 transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                    
                    {/* Language Selector */}
                    <div className="relative" ref={langRef}>
                        <button
                            onClick={() => setLangOpen(!langOpen)}
                            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all hover:border-slate-900 hover:text-slate-950"
                        >
                            <Languages className="w-3.5 h-3.5" />
                            <span>{currentLang.flag}</span>
                            <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                            {langOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-2 w-40 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl ring-1 ring-slate-950/5"
                                >
                                    <div className="py-1">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => changeLanguage(lang)}
                                                className={`flex w-full items-center gap-3 px-4 py-2 text-left text-xs transition-colors hover:bg-slate-50 ${currentLang.code === lang.code ? 'bg-slate-50 text-slate-950 font-bold' : 'text-slate-600'}`}
                                            >
                                                <span className="text-sm">{lang.flag}</span>
                                                {lang.name}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <a
                        href="#contact"
                        onClick={(e) => handleNavClick(e, "/#contact")}
                        className="rounded-full border border-slate-900 px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-950 transition-colors hover:bg-slate-900 hover:text-white"
                    >
                        Let&apos;s Talk
                    </a>
                </div>

                <div className="md:hidden flex items-center gap-4">
                    <div className="relative" ref={mobileLangRef}>
                        <button
                            onClick={() => setLangOpen(!langOpen)}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600"
                        >
                            <Languages className="w-5 h-5" />
                        </button>
                        
                        <AnimatePresence>
                            {langOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl ring-1 ring-slate-950/5 z-[2100]"
                                >
                                    <div className="py-2">
                                        <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-50 mb-1">
                                            Select Language
                                        </div>
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => changeLanguage(lang)}
                                                className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-slate-50 ${currentLang.code === lang.code ? 'bg-slate-50 text-slate-950 font-bold' : 'text-slate-600'}`}
                                            >
                                                <span className="text-lg">{lang.flag}</span>
                                                {lang.name}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
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
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="font-mono text-3xl font-extrabold tracking-tight text-slate-950 transition-colors hover:text-slate-500"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
