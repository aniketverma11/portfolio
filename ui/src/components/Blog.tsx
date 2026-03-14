'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import { Calendar, Clock, Eye, Tag } from 'lucide-react';

interface BlogProps {
    data: BlogPost[];
}

export default function Blog({ data }: BlogProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    // Get unique categories
    const categories = ['All', ...Array.from(new Set(data.map(post => post.category)))];

    // Filter posts by category
    const filteredPosts = selectedCategory === 'All'
        ? data
        : data.filter(post => post.category === selectedCategory);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <section id="blog" className="relative px-4 py-20">
            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="text-center mb-16">
                    <p className="section-kicker mb-3">Writing</p>
                    <h2 className="section-title mb-6 text-5xl font-semibold text-slate-950 md:text-6xl">
                        Blog & Insights
                    </h2>
                    <p className="mx-auto max-w-3xl text-xl text-slate-600">
                        Sharing knowledge, experiences, and insights from the world of technology
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                                ? 'bg-slate-950 text-white'
                                : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-900 hover:text-slate-950'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Blog Posts Grid */}
                {filteredPosts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-2xl text-slate-500">No blog posts found</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post, index) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="surface-card block overflow-hidden rounded-[1.75rem] transition-all duration-500 hover:-translate-y-2"
                                style={{
                                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                                }}
                            >
                                <div className="relative h-48 overflow-hidden bg-slate-100">
                                    {post.featured_image_url ? (
                                        <img
                                            src={post.featured_image_url}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center">
                                            <div className="font-mono text-4xl text-slate-300">&lt;post /&gt;</div>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-slate-950/10"></div>

                                    <div className="absolute top-4 left-4">
                                        <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="mb-3 line-clamp-2 text-xl font-semibold text-slate-950 transition-colors duration-300 group-hover:text-slate-700">
                                        {post.title}
                                    </h3>

                                    <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-600">
                                        {post.excerpt}
                                    </p>

                                    {post.tags && post.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {post.tags.slice(0, 3).map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2 py-1 text-xs text-slate-600"
                                                >
                                                    <Tag size={12} />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-500">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                {formatDate(post.published_at || post.created_at)}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} />
                                                {post.read_time} min
                                            </span>
                                        </div>
                                        <span className="flex items-center gap-1">
                                            <Eye size={14} />
                                            {post.views}
                                        </span>
                                    </div>

                                    <div className="group/link mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-900">
                                        Read More
                                        <svg
                                            className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
}
