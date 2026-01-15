import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";
import { ArticleGrid } from "@/components/news/ArticleGrid";
import { Badge } from "@/components/ui/Badge";
import { supabase } from '@/lib/supabase';

export const metadata: Metadata = {
    title: 'Insight | Solar Safety Journal',
    description: '태양광 안전 및 기술 심층 분석 리포트',
};

export default async function InsightPage() {
    // Insight covers 'Safety', 'Maintenance', or specific 'Insight' tag.
    const { data: articlesData, error } = await supabase
        .from('articles')
        .select('*')
        .in('category', ['Insight', 'Safety', 'Maintenance'])
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching insight articles:', error);
    }

    const articles = (articlesData || []).map((item) => ({
        id: item.id,
        title: item.title,
        excerpt: item.excerpt,
        category: item.category,
        date: new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        imageUrl: item.image_url,
        author: item.author
    }));

    const tabs = [
        { id: 'news', label: 'News', path: '/news' },
        { id: 'insight', label: 'Insight', path: '/insight' },
        { id: 'regulation', label: 'Regulation', path: '/regulation' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            <main className="flex-grow py-12">
                <div className="container mx-auto px-4">
                    {/* Page Header */}
                    <div className="mb-10 text-center max-w-2xl mx-auto">
                        <Badge variant="orange" className="mb-3">Category</Badge>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Insight</h1>
                        <p className="text-gray-600 font-medium text-lg">
                            태양광 안전 및 기술 심층 분석 리포트
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center mb-12 border-b border-gray-200">
                        <nav className="flex space-x-8 -mb-px overflow-x-auto">
                            {tabs.map((tab) => (
                                <Link
                                    key={tab.id}
                                    href={tab.path}
                                    className={`pb-4 px-2 text-xl font-bold whitespace-nowrap border-b-2 transition-colors ${tab.id === 'insight'
                                        ? 'border-[var(--color-solar-orange)] text-[var(--color-solar-orange)]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {tab.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Main Fetch Content (75%) */}
                        <div className="lg:w-3/4">
                            <ArticleGrid articles={articles} emptyMessage="인사이트 기사가 없습니다" />
                        </div>

                        {/* Sidebar (25%) */}
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
