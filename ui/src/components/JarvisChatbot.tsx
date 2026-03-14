"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageSquareText, Terminal, Volume2, VolumeX } from "lucide-react";

interface Message {
    id: number;
    text: string;
    sender: "user" | "jarvis";
    isStreaming?: boolean;
}

const fullTooltipText = "Need quick portfolio details? Ask here.";

const JarvisChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const socketRef = useRef<WebSocket | null>(null);
    const isMutedRef = useRef(isMuted);
    const currentResponseRef = useRef("");

    useEffect(() => {
        isMutedRef.current = isMuted;
    }, [isMuted]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const speak = useCallback((text: string) => {
        if (isMutedRef.current) return;

        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();

            const cleanText = text.replace(/[*#`_]/g, '');

            const utterance = new SpeechSynthesisUtterance(cleanText);
            const voices = window.speechSynthesis.getVoices();

            const preferredVoice = voices.find(
                (voice) =>
                    voice.name.includes("Male") ||
                    voice.name.includes("David") ||
                    voice.name.includes("Daniel") ||
                    voice.name.includes("Google US English")
            );
            if (preferredVoice) utterance.voice = preferredVoice;

            utterance.pitch = 0.8;
            utterance.rate = 1.0;
            window.speechSynthesis.speak(utterance);
        }
    }, []);

    useEffect(() => {
        if (isOpen && !socketRef.current) {
            // Initialize WebSocket connection
            const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://127.0.0.1:8000/ws/chat/";
            const ws = new WebSocket(wsUrl);
            socketRef.current = ws;

            ws.onopen = () => {
                console.log("Connected to portfolio assistant");
            };


            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (data.type === 'start') {
                    setIsLoading(false);
                    currentResponseRef.current = "";
                    const botMessage: Message = {
                        id: Date.now(),
                        text: "",
                        sender: "jarvis",
                        isStreaming: true
                    };
                    setMessages((prev) => [...prev, botMessage]);
                } else if (data.type === 'chunk') {
                    currentResponseRef.current += data.content;
                    setMessages((prev) => {
                        const lastMsgIndex = prev.length - 1;
                        if (lastMsgIndex >= 0 && prev[lastMsgIndex].sender === 'jarvis') {
                            const updatedMsg = {
                                ...prev[lastMsgIndex],
                                text: prev[lastMsgIndex].text + data.content
                            };
                            return [...prev.slice(0, lastMsgIndex), updatedMsg];
                        }
                        return prev;
                    });
                } else if (data.type === 'end') {
                    setMessages((prev) => {
                        const lastMsgIndex = prev.length - 1;
                        if (lastMsgIndex >= 0) {
                            const updatedMsg = { ...prev[lastMsgIndex], isStreaming: false };
                            return [...prev.slice(0, lastMsgIndex), updatedMsg];
                        }
                        return prev;
                    });
                    speak(currentResponseRef.current);
                } else if (data.type === 'error' || data.error) {
                    console.error("Assistant error:", data.error);
                    const errorMessage: Message = {
                        id: Date.now(),
                        text: "Error processing request.",
                        sender: "jarvis",
                    };
                    setMessages((prev) => [...prev, errorMessage]);
                    speak("Error processing request.");
                    setIsLoading(false);
                } else if (data.message) {
                    const botMessage: Message = {
                        id: Date.now(),
                        text: data.message,
                        sender: "jarvis",
                    };
                    setMessages((prev) => [...prev, botMessage]);
                    speak(data.message);
                    setIsLoading(false);
                }
            };
            
            ws.onerror = (error) => {
                console.error("WebSocket Error:", error);
                const errorMessage: Message = {
                    id: Date.now(),
                    text: "Connection interrupted. Please try again.",
                    sender: "jarvis",
                };
                setMessages((prev) => [...prev, errorMessage]);
                speak("Connection interrupted.");
                setIsLoading(false);
            };

            ws.onclose = () => {
                console.log("Disconnected from portfolio assistant");
                socketRef.current = null;
            };
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, [isOpen, speak]);


    const toggleMute = () => {
        if (!isMuted) {
            window.speechSynthesis.cancel();
        }
        setIsMuted(!isMuted);
    };



    const [showTooltip, setShowTooltip] = useState(true);
    const [tooltipText, setTooltipText] = useState("");

    useEffect(() => {
        if (!showTooltip) return;

        let i = 0;
        const interval = setInterval(() => {
            setTooltipText(fullTooltipText.slice(0, i + 1));
            i++;
            if (i > fullTooltipText.length) {
                clearInterval(interval);
                setTimeout(() => setShowTooltip(false), 10000);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [showTooltip]);

    const handleOpen = () => {
        setIsOpen(true);
        setShowTooltip(false);
        if (messages.length === 0) {
            const greeting = "Portfolio assistant is online. Ask about experience, projects, or skills.";
            setMessages([{ id: 0, text: greeting, sender: "jarvis" }]);
            speak(greeting);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: query,
            sender: "user",
        };

        setMessages((prev) => [...prev, userMessage]);
        setQuery("");
        setIsLoading(true);

        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({ message: userMessage.text }));
        } else {
            const errorMessage: Message = {
                id: Date.now() + 1,
                text: "Assistant is offline right now.",
                sender: "jarvis"
            };
            setMessages((prev) => [...prev, errorMessage]);
            speak("Assistant is offline.");
            setIsLoading(false);
        }
    };

    return (
        <>
            {!isOpen && (
                <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] flex flex-col items-end gap-2">
                    <AnimatePresence>
                        {showTooltip && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                className="surface-card relative mb-2 max-w-[180px] rounded-2xl px-3 py-2 md:max-w-[220px]"
                            >
                                <p className="typing-cursor font-mono text-xs text-slate-700 md:text-sm">{tooltipText}</p>
                                <div className="absolute -bottom-2 right-4 h-3 w-3 rotate-45 border-b border-r border-slate-200 bg-white md:h-4 md:w-4"></div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={handleOpen}
                        className="rounded-full border border-slate-300 bg-white p-3 text-slate-700 shadow-xl shadow-slate-200/60 transition-all group hover:border-slate-900 hover:text-slate-950 md:p-4"
                    >
                        <MessageSquareText className="h-6 w-6 transition-transform duration-700 group-hover:-translate-y-0.5 md:h-8 md:w-8" />
                    </motion.button>
                </div>
            )}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="relative flex h-[600px] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white font-mono shadow-2xl"
                    >
                            <div className="z-20 flex items-center justify-between border-b border-slate-200 bg-slate-50 p-4">
                                <div className="flex items-center gap-2 text-slate-700">
                                    <Terminal className="h-5 w-5" />
                                    <span className="text-sm font-bold tracking-[0.18em]">PORTFOLIO ASSISTANT</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={toggleMute}
                                        className="text-slate-400 transition-colors hover:text-slate-900"
                                        title={isMuted ? "Unmute" : "Mute"}
                                    >
                                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                                    </button>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-slate-400 transition-colors hover:text-slate-900"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="z-20 flex-1 space-y-4 overflow-y-auto p-4">
                                {messages.map((msg) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: msg.sender === "user" ? 20 : -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={msg.id}
                                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-3 rounded-lg border ${msg.sender === "user"
                                                ? "border-slate-900 bg-slate-900 text-white"
                                                : "border-slate-200 bg-slate-50 text-slate-700"
                                                }`}
                                        >
                                            <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                                                {msg.text}
                                                {msg.isStreaming && (
                                                    <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-slate-500" />
                                                )}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-700">
                                            <span className="h-2 w-2 animate-pulse rounded-full bg-slate-500"></span>
                                            <span className="h-2 w-2 animate-pulse rounded-full bg-slate-500 delay-100"></span>
                                            <span className="h-2 w-2 animate-pulse rounded-full bg-slate-500 delay-200"></span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            <form onSubmit={handleSubmit} className="z-20 border-t border-slate-200 bg-slate-50 p-4">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Ask about projects, experience, or skills..."
                                        className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-slate-900 focus:outline-none"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="rounded-full bg-slate-900 px-4 text-white transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <Send className="h-5 w-5" />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default JarvisChatbot;
