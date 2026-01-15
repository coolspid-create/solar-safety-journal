import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";
import { ArticleGrid } from "@/components/news/ArticleGrid";
import { Badge } from "@/components/ui/Badge";
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Search | Solar Safety Journal',
    description: 'Search results for Solar Safety Journal articles.',
};

interface SearchPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    // Await params first (Next.js 15+)
    const params = await searchParams;
    const q = typeof params.q === 'string' ? params.q : '';

    let articles: any[] = [];
    let errorMsg = '';

    if (q) {
        try {
            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .ilike('title', `%${q}%`)
                .order('created_at', { ascending: false });

            if (error) throw error;

            articles = (data || []).map((item) => ({
                id: item.id,
                title: item.title,
                excerpt: item.excerpt,
                category: item.category,
                date: new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                imageUrl: item.image_url,
                author: item.author
            }));
        } catch (error) {
            console.error('Error searching articles:', error);
            errorMsg = '검색 중 오류가 발생했습니다.';
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            <main className="flex-grow py-12">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="mb-10 text-center max-w-2xl mx-auto">
                        <Badge variant="orange" className="mb-3">Search Results</Badge>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4 break-words">
                            "{q}"에 대한 검색 결과입니다
                        </h1>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Main Content */}
                        <div className="lg:w-3/4">
                            {articles.length > 0 ? (
                                <ArticleGrid articles={articles} emptyMessage="" />
                            ) : (
                                <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        일치하는 기사가 없습니다
                                    </h3>
                                    <p className="text-gray-500 mb-6">
                                        다른 키워드로 검색하거나 홈으로 돌아가 보세요.
                                    </p>
                                    <Link href="/">
                                        <Button variant="primary">홈으로 돌아가기</Button>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:w-1/4">
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
