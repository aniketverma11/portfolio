'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogPosts } from '@/lib/api';
import { BlogPost } from '@/lib/types';
import { Calendar, Clock, Eye, Tag, Search } from 'lucide-react';

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchPosts() {
            try {
                const data = await getBlogPosts();
                setPosts(data);
            } catch (error) {
                console.error('Failed to fetch posts', error);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    const categories = ['All', ...Array.from(new Set(posts.map(post => post.category)))];

    const filteredPosts = posts.filter(post => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <main className="page-shell min-h-screen bg-slate-50 text-slate-900">
            <Navbar />

            <div className="relative min-h-screen px-4 pb-20 pt-24">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <p className="section-kicker mb-3">Writing</p>
                        <h1 className="section-title mb-6 text-5xl font-semibold text-slate-950 md:text-7xl">
                            Blog & Insights
                        </h1>
                        <p className="mx-auto mb-8 max-w-3xl text-xl text-slate-600">
                            Notes on AI systems, backend engineering, product delivery, and scalable software.
                        </p>

                        <div className="relative mx-auto mb-8 max-w-md">
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-full border border-slate-200 bg-white py-3 pl-12 pr-4 text-slate-900 transition-all placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
                            />
                        </div>
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

                    {/* Content */}
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-900 border-t-transparent"></div>
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-2xl text-slate-500">No posts found matching your criteria</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="surface-card group flex h-full flex-col overflow-hidden rounded-[1.75rem] transition-all duration-500 hover:-translate-y-2"
                                >
                                    <div className="relative h-48 shrink-0 overflow-hidden bg-slate-100">
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

                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="mb-3 line-clamp-2 text-xl font-semibold text-slate-950 transition-colors duration-300 group-hover:text-slate-700">
                                            {post.title}
                                        </h3>

                                        <p className="mb-4 flex-grow line-clamp-3 text-sm leading-relaxed text-slate-600">
                                            {post.excerpt}
                                        </p>

                                        {post.tags && post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4 mt-auto">
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

                                        <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-500">
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
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
}
