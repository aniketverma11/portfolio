import React from "react";

export default function Footer() {
    return (
        <footer className="relative z-10 border-t border-slate-200 bg-transparent py-12 text-center overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center gap-6">
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
                        Crafted for business excellence
                    </p>
                    <p className="font-mono text-sm text-slate-500">
                        &copy; {new Date().getFullYear()} <span className="text-slate-950 font-bold">Aniket Verma</span>. Freelance Engineer & Consultant.
                    </p>
                    <a 
                        href="https://aniketverma.xyz" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 hover:text-blue-700 underline underline-offset-8"
                    >
                        Visit Engineering Portfolio
                    </a>
                </div>
            </div>
        </footer>
    );
}
