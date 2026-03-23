import React from "react";
import { motion } from "framer-motion";
import { Cpu, Database, Cloud, Code, Terminal, Boxes, CpuIcon } from "lucide-react";
import { 
    SiPython, SiJavascript, SiSolidity, SiCplusplus, SiHtml5, SiCss3,
    SiDjango, SiFastapi, SiReact, SiNextdotjs, SiNodedotjs, SiTensorflow, SiPytorch,
    SiAmazonwebservices, SiGooglecloud, SiDocker, SiNginx, SiGit,
    SiPostgresql, SiMongodb, SiMysql, SiRedis, SiEthereum, SiLangchain,
    SiOpenai, SiAnthropic, SiPydantic
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { Skill } from "@/lib/types";

const iconMap: Record<string, React.ReactNode> = {
    "Languages": <Code className="w-5 h-5" />,
    "Frameworks & Libraries": <Boxes className="w-5 h-5" />,
    "Cloud & DevOps": <Cloud className="w-5 h-5" />,
    "Databases": <Database className="w-5 h-5" />,
    "AI & Blockchain": <Terminal className="w-5 h-5" />,
};

const skillIconMap: Record<string, React.ReactNode> = {
    // Languages
    "Python": <SiPython className="w-3.5 h-3.5 text-[#3776AB]" />,
    "JavaScript": <SiJavascript className="w-3.5 h-3.5 text-[#F7DF1E]" />,
    "Solidity": <SiSolidity className="w-3.5 h-3.5 text-[#363636]" />,
    "SQL": <Database className="w-3.5 h-3.5 text-slate-600" />,
    "C++": <SiCplusplus className="w-3.5 h-3.5 text-[#00599C]" />,
    "HTML/CSS": <div className="flex gap-0.5"><SiHtml5 className="w-3 h-3 text-[#E34F26]" /><SiCss3 className="w-3 h-3 text-[#1572B6]" /></div>,
    
    // Frameworks
    "Django": <SiDjango className="w-3.5 h-3.5 text-[#092E20]" />,
    "FastAPI": <SiFastapi className="w-3.5 h-3.5 text-[#05998B]" />,
    "React.js": <SiReact className="w-3.5 h-3.5 text-[#61DAFB]" />,
    "Next.js": <SiNextdotjs className="w-3.5 h-3.5 text-black" />,
    "Node.js": <SiNodedotjs className="w-3.5 h-3.5 text-[#339933]" />,
    "LangChain": <SiLangchain className="w-3.5 h-3.5 text-[#1C3C3C]" />,
    "TensorFlow": <SiTensorflow className="w-3.5 h-3.5 text-[#FF6F00]" />,
    "PyTorch": <SiPytorch className="w-3.5 h-3.5 text-[#EE4C2C]" />,
    
    // Cloud & DevOps
    "AWS (EC2, S3, Lambda)": <SiAmazonwebservices className="w-3.5 h-3.5 text-[#FF9900]" />,
    "Azure": <VscAzure className="w-3.5 h-3.5 text-[#0078D4]" />,
    "GCP": <SiGooglecloud className="w-3.5 h-3.5 text-[#4285F4]" />,
    "Docker": <SiDocker className="w-3.5 h-3.5 text-[#2496ED]" />,
    "Nginx": <SiNginx className="w-3.5 h-3.5 text-[#009639]" />,
    "Git": <SiGit className="w-3.5 h-3.5 text-[#F05032]" />,
    "CI/CD": <CpuIcon className="w-3.5 h-3.5 text-slate-500" />,
    
    // Databases
    "PostgreSQL": <SiPostgresql className="w-3.5 h-3.5 text-[#4169E1]" />,
    "MongoDB": <SiMongodb className="w-3.5 h-3.5 text-[#47A248]" />,
    "MySQL": <SiMysql className="w-3.5 h-3.5 text-[#4479A1]" />,
    "Redis": <SiRedis className="w-3.5 h-3.5 text-[#DC382D]" />,
    
    // AI & Blockchain
    "Ethereum": <SiEthereum className="w-3.5 h-3.5 text-[#3C3C3D]" />,
    "LangGraph": <SiLangchain className="w-3.5 h-3.5 text-[#1C3C3C]" />,
    "LLMs": <SiOpenai className="w-3.5 h-3.5 text-[#000000]" />,
    "RAG": <SiPydantic className="w-3.5 h-3.5 text-[#E92063]" />,
    "GenAI": <SiAnthropic className="w-3.5 h-3.5 text-[#D97757]" />,
    "Smart Contracts": <SiSolidity className="w-3.5 h-3.5 text-[#363636]" />,
};

export default function Skills({ data }: { data: Skill[] }) {
    const skills = data;
    return (
        <section id="skills" className="relative py-24 bg-slate-50/30 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-slate-100 rounded-full blur-3xl opacity-50" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl"
                    >
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                                <Cpu className="h-6 w-6" />
                            </div>
                            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                                Core Stack
                            </p>
                        </div>
                        <h2 className="section-title text-4xl font-semibold text-slate-950 md:text-5xl leading-[1.1]">
                            Technical foundation for building complex systems
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-slate-600">
                            Full-stack engineering with a strong backend foundation, cloud delivery, and applied AI systems.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="surface-card group relative overflow-hidden rounded-[2.5rem] p-8 transition-all hover:shadow-2xl hover:-translate-y-2 border border-slate-200 bg-white"
                        >
                            {/* Card Background Branding */}
                            <div className="absolute -bottom-6 -right-6 h-32 w-32 opacity-[0.03] transition-opacity group-hover:opacity-[0.08] pointer-events-none select-none">
                                {iconMap[skill.category] || <Cpu className="w-full h-full" />}
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 shadow-sm transition-all group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 group-hover:shadow-md">
                                        {iconMap[skill.category] || <Cpu className="w-6 h-6" />}
                                    </div>
                                    <h3 className="section-title text-xl font-bold text-slate-950">
                                        {skill.category}
                                    </h3>
                                </div>

                                <div className="flex flex-wrap gap-2.5">
                                    {skill.items.map((item) => (
                                        <span
                                            key={item}
                                            className="flex items-center gap-2.5 rounded-full border border-slate-100 bg-slate-50/80 px-4 py-2 text-[11px] font-mono font-bold text-slate-600 transition-all group-hover:border-slate-200 group-hover:bg-white group-hover:text-slate-900 shadow-sm"
                                        >
                                            {skillIconMap[item] || <div className="w-3 h-3 rounded-full bg-slate-300" />}
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Decorative line */}
                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-slate-900 transition-all duration-500 group-hover:w-full" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
