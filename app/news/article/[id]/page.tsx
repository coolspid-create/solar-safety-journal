import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';

import ArticleAdminActions from '@/components/news/ArticleAdminActions';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const { data: article } = await supabase.from('articles').select('*').eq('id', id).single();

    if (!article) {
        return { title: 'Article Not Found' };
    }

    return {
        title: `${article.title} | Solar Safety Journal`,
        description: article.excerpt,
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { data: article } = await supabase.from('articles').select('*').eq('id', id).single();

    if (!article) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            <main className="flex-grow pb-16 bg-white">
                {/* Hero Section - Full Width */}
                <div className="relative h-[40vh] md:h-[50vh] w-full mb-12">
                    <ArticleAdminActions articleId={id} />
                    <Image
                        src={article.image_url}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12 text-white">
                        <div className="max-w-4xl mx-auto">
                            <Badge variant="orange" className="mb-4 text-sm px-3 py-1">{article.category}</Badge>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-6 drop-shadow-lg tracking-tight">
                                {article.title}
                            </h1>
                            <div className="flex items-center space-x-3 text-sm md:text-base text-gray-200">
                                <span className="font-bold text-white">{article.author}</span>
                                <span>•</span>
                                <span>{new Date(article.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Article Body - Centered & Readable */}
                <article className="max-w-3xl mx-auto px-6">
                    <div
                        className="
                            text-lg text-gray-800 leading-relaxed 
                            [&>p]:mb-8 [&>p]:leading-loose
                            [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-16 [&>h2]:mb-6 
                            [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mt-12 [&>h3]:mb-4
                            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-8 [&>ul]:space-y-2
                            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-8 [&>ol]:space-y-2
                            [&>blockquote]:border-l-4 [&>blockquote]:border-[var(--color-solar-orange)] [&>blockquote]:pl-6 [&>blockquote]:py-1 [&>blockquote]:my-10 [&>blockquote]:italic [&>blockquote]:text-xl [&>blockquote]:text-gray-700 [&>blockquote]:bg-gray-50 [&>blockquote]:rounded-r-lg
                            [&>img]:rounded-xl [&>img]:shadow-md [&>img]:my-10 [&>img]:w-full
                            [&>figure]:my-10 [&>figure]:w-full
                            [&>figcaption]:text-center [&>figcaption]:text-sm [&>figcaption]:text-gray-500 [&>figcaption]:mt-3
                            [&>a]:text-[var(--color-solar-orange)] [&>a]:underline [&>a]:underline-offset-4
                        "
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </article>
            </main>

            <Footer />
        </div>
    );
}
