
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Terminal, Bot, User, MessageCircle } from "lucide-react";

interface Message {
    id: number;
    text: string;
    sender: "user" | "agent";
    isStreaming?: boolean;
}

const fullTooltipText = "Have a question? Ask Aniket's assistant.";

const JarvisChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const socketRef = useRef<WebSocket | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && !socketRef.current) {
            const wsUrl = import.meta.env.VITE_WS_URL || "ws://127.0.0.1:8000/ws/chat/";
            const ws = new WebSocket(wsUrl);
            socketRef.current = ws;

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (data.type === 'start') {
                    setIsLoading(false);
                    const botMessage: Message = {
                        id: Date.now(),
                        text: "",
                        sender: "agent",
                        isStreaming: true
                    };
                    setMessages((prev) => [...prev, botMessage]);
                } else if (data.type === 'chunk') {
                    setMessages((prev) => {
                        const lastMsgIndex = prev.length - 1;
                        if (lastMsgIndex >= 0 && prev[lastMsgIndex].sender === 'agent') {
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
                } else if (data.type === 'error' || data.error) {
                    const errorMessage: Message = {
                        id: Date.now(),
                        text: "Something went wrong. Please try again.",
                        sender: "agent",
                    };
                    setMessages((prev) => [...prev, errorMessage]);
                    setIsLoading(false);
                } else if (data.message) {
                    const botMessage: Message = {
                        id: Date.now(),
                        text: data.message,
                        sender: "agent",
                    };
                    setMessages((prev) => [...prev, botMessage]);
                    setIsLoading(false);
                }
            };
            
            ws.onerror = () => {
                setIsLoading(false);
            };

            ws.onclose = () => {
                socketRef.current = null;
            };
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, [isOpen]);

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
                setTimeout(() => setShowTooltip(false), 8000);
            }
        }, 40);

        return () => clearInterval(interval);
    }, [showTooltip]);

    const handleOpen = () => {
        setIsOpen(true);
        setShowTooltip(false);
        if (messages.length === 0) {
            const greeting = "Hello! I'm Aniket's assistant. You can ask me about his work experience, technical skills, or recent projects. How can I help you today?";
            setMessages([{ id: 0, text: greeting, sender: "agent" }]);
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
                text: "Assistant is currently offline. Please try again later.",
                sender: "agent"
            };
            setMessages((prev) => [...prev, errorMessage]);
            setIsLoading(false);
        }
    };

    return (
        <>
            {!isOpen && (
                <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] flex flex-col items-end gap-3">
                    <AnimatePresence>
                        {showTooltip && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="surface-card relative mb-2 max-w-[220px] rounded-2xl px-4 py-3 shadow-xl border border-slate-200"
                            >
                                <p className="font-sans text-xs font-medium text-slate-700">{tooltipText}</p>
                                <div className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 bg-white border-b border-r border-slate-200"></div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOpen}
                        className="h-14 w-14 md:h-16 md:w-16 flex items-center justify-center rounded-full bg-slate-950 text-white shadow-2xl transition-all hover:bg-slate-900 active:bg-black group border border-slate-800"
                    >
                        <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
                    </motion.button>
                </div>
            )}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-[101] flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="relative flex h-[650px] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white font-sans shadow-2xl"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 p-5 px-8">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg">
                                        <Bot className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-bold text-slate-900 tracking-tight">Aniket's Assistant</h2>
                                        <div className="flex items-center gap-1.5">
                                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                            <span className="text-[11px] font-medium text-slate-500">Ready to help</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="h-10 w-10 flex items-center justify-center rounded-full text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-900"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Messages area */}
                            <div className="flex-1 space-y-6 overflow-y-auto p-6 px-8 scrollbar-thin scrollbar-thumb-slate-200">
                                {messages.map((msg) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        key={msg.id}
                                        className={`flex gap-4 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                                    >
                                        <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                                            msg.sender === "user" 
                                            ? "border-slate-800 bg-slate-900" 
                                            : "border-slate-200 bg-slate-50"
                                        }`}>
                                            {msg.sender === "user" ? <User className="h-4 w-4 text-slate-100" /> : <Terminal className="h-4 w-4 text-slate-600" />}
                                        </div>
                                        <div
                                            className={`relative max-w-[85%] rounded-2xl px-5 py-3.5 shadow-sm border ${
                                                msg.sender === "user"
                                                    ? "border-slate-800 bg-slate-900 text-white rounded-tr-none"
                                                    : "border-slate-100 bg-slate-50/50 text-slate-800 rounded-tl-none"
                                            }`}
                                        >
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                                {msg.text}
                                                {msg.isStreaming && (
                                                    <span className="ml-1 inline-block h-4 w-1.5 animate-pulse bg-slate-400 align-middle" />
                                                )}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                                {isLoading && (
                                    <div className="flex flex-row gap-4">
                                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
                                            <Terminal className="h-4 w-4 text-slate-600" />
                                        </div>
                                        <div className="flex items-center gap-1.5 rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4">
                                            <span className="text-xs font-medium text-slate-400 mr-1 italic">Agent is typing</span>
                                            <motion.span 
                                                animate={{ opacity: [0, 1, 0] }} 
                                                transition={{ repeat: Infinity, duration: 1.5, times: [0, 0.5, 1] }} 
                                                className="h-1 w-1 rounded-full bg-slate-400"
                                            />
                                            <motion.span 
                                                animate={{ opacity: [0, 1, 0] }} 
                                                transition={{ repeat: Infinity, duration: 1.5, times: [0, 0.5, 1], delay: 0.2 }} 
                                                className="h-1 w-1 rounded-full bg-slate-400"
                                            />
                                            <motion.span 
                                                animate={{ opacity: [0, 1, 0] }} 
                                                transition={{ repeat: Infinity, duration: 1.5, times: [0, 0.5, 1], delay: 0.4 }} 
                                                className="h-1 w-1 rounded-full bg-slate-400"
                                            />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Footer / Input */}
                            <div className="border-t border-slate-100 bg-white p-6 px-8">
                                <form onSubmit={handleSubmit} className="relative">
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Ask a question..."
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 pl-14 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-slate-900/5"
                                    />
                                    <MessageCircle className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                    <button
                                        type="submit"
                                        disabled={isLoading || !query.trim()}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-slate-950 px-4 py-2.5 text-white transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                                    >
                                        <Send className="h-4 w-4" />
                                    </button>
                                </form>
                                <p className="mt-4 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
                                    Powered by Aniket's Portfolio Agent
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default JarvisChatbot;
