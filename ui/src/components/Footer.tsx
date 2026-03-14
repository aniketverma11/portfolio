"use client";
import React from "react";

export default function Footer() {
    return (
        <footer className="relative z-10 border-t border-slate-200 bg-slate-50 py-8 text-center">
            <div className="container mx-auto px-4">
                <p className="font-mono text-sm text-slate-500">
                    &copy; {new Date().getFullYear()} Aniket Verma. Built for serious engineering opportunities.
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                    Software Engineer Portfolio
                </p>
            </div>
        </footer>
    );
}
