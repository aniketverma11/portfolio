'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/lib/types';
import { getBlogPost } from '@/lib/api';
import { Calendar, Clock, Eye, Tag, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BlogPostClient({
    params,
    initialPost = null
}: {
    params: Promise<{ slug: string }>,
    initialPost?: BlogPost | null
}) {
    const router = useRouter();
    const { slug } = use(params); // Unwrap the Promise
    const [post, setPost] = useState<BlogPost | null>(initialPost);
    const [loading, setLoading] = useState(!initialPost);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialPost) return;

        async function fetchPost() {
            try {
                const data = await getBlogPost(slug);
                setPost(data);
            } catch (err) {
                console.error('Error fetching blog post:', err);
                setError('Failed to load blog post');
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [slug, initialPost]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-slate-900 border-r-transparent mb-4"></div>
                    <p className="text-lg">Loading blog post...</p>
                </div>
            </main>
        );
    }

    if (error || !post) {
        return (
            <main className="min-h-screen bg-slate-50 text-slate-900">
                <Navbar />
                <div className="flex items-center justify-center min-h-[80vh]">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-red-500 mb-4">Error</h1>
                        <p className="text-slate-500 mb-6">{error || 'Blog post not found'}</p>
                        <button
                            onClick={() => router.push('/#blog')}
                            className="rounded-full bg-slate-950 px-6 py-3 text-white transition-colors hover:bg-slate-800"
                        >
                            Back to Blog
                        </button>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="page-shell min-h-screen bg-slate-50 text-slate-900">
            <Navbar />

            <article className="max-w-4xl mx-auto px-4 py-24">
                <button
                    onClick={() => router.push('/#blog')}
                    className="group mb-8 inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-950"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </button>

                {post.featured_image_url && (
                    <div className="relative mb-8 h-96 overflow-hidden rounded-[2rem] border border-slate-200 bg-white">
                        <img
                            src={post.featured_image_url}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-950/10"></div>
                    </div>
                )}

                <span className="mb-6 inline-block rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                    {post.category}
                </span>

                <h1 className="section-title mb-6 text-5xl font-semibold leading-tight text-slate-950 md:text-6xl">
                    {post.title}
                </h1>

                <p className="mb-8 text-xl leading-relaxed text-slate-600">
                    {post.excerpt}
                </p>

                <div className="mb-8 flex flex-wrap items-center gap-6 border-b border-slate-200 pb-8 text-sm text-slate-500">
                    <span className="flex items-center gap-2">
                        <Calendar size={18} />
                        {formatDate(post.published_at || post.created_at)}
                    </span>
                    <span className="flex items-center gap-2">
                        <Clock size={18} />
                        {post.read_time} min read
                    </span>
                    <span className="flex items-center gap-2">
                        <Eye size={18} />
                        {post.views} views
                    </span>
                    <span className="font-medium text-slate-900">By {post.author}</span>
                </div>

                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-8">
                        {post.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600"
                            >
                                <Tag size={16} />
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div
                    className="blog-content surface-card rounded-[2rem] p-8 text-lg"
                    dangerouslySetInnerHTML={{ __html: post.content || '' }}
                />

                <div className="mt-12 border-t border-slate-200 pt-8">
                    <button
                        onClick={() => router.push('/#blog')}
                        className="rounded-full bg-slate-950 px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-slate-800"
                    >
                        Read More Articles
                    </button>
                </div>
            </article>

            <Footer />
        </main>
    );
}
