import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";
import { LargeArticleCard } from "@/components/ui/LargeArticleCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { supabase } from '@/lib/supabase';
import { Article } from '@/lib/mockData';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);
    const categoryLower = decodedCategory.toLowerCase();

    // URL Category to Title Mapping
    const titleMap: { [key: string]: string } = {
        'news': 'News',
        'insight': 'Insight',
        'regulation': 'Regulation',
        'industry': 'Industry',
        // Keep legacy support or fallbacks if needed
        'all': 'News',
        'safety': 'Insight',
    };

    const title = titleMap[categoryLower] || decodedCategory;

    return {
        title: `${title} | Solar Safety Journal`,
        description: `${title} - Latest updates and information.`,
    };
}

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const { category } = await params;

    // Await searchParams if it exists
    const resolvedSearchParams = searchParams ? await searchParams : undefined;

    const rawCategory = decodeURIComponent(category);
    const categoryLower = rawCategory.toLowerCase();

    // Mapping URL param to Database Category Value
    let dbCategory: string | null = null;
    let displayTitle = '';
    let displayDesc = '';

    switch (categoryLower) {
        case 'news':
        case 'all': // Keep fallback
            dbCategory = null; // Fetch all
            displayTitle = 'News';
            displayDesc = '태양광 산업의 최신 동향과 주요 뉴스를 빠르게 전달합니다.';
            break;
        case 'insight':
        case 'safety':
        case 'safety-guide':
            dbCategory = 'Safety';
            displayTitle = 'Insight';
            displayDesc = '현장 경험과 데이터를 바탕으로 한 태양광 안전 및 기술 심층 분석 리포트입니다.';
            break;
        case 'regulation':
        case 'policy':
            dbCategory = 'Regulation';
            displayTitle = 'Regulation';
            displayDesc = '꼭 알아야 할 태양광 관련 최신 정책 변화와 법규 개정 정보를 정리해 드립니다.';
            break;
        case 'industry':
        case 'market':
            dbCategory = 'Market';
            displayTitle = 'Industry';
            displayDesc = 'Market analysis and industrial news.';
            break;
        case 'maintenance':
            dbCategory = 'Maintenance';
            displayTitle = 'Maintenance';
            displayDesc = 'Tips for efficient power plant operations.';
            break;
        default:
            dbCategory = rawCategory;
            displayTitle = rawCategory;
            displayDesc = `${rawCategory} related articles.`;
    }

    // Prepare Query
    let query = supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

    if (dbCategory) {
        query = query.eq('category', dbCategory);
    }

    // Basic Search Support if q param exists
    const searchQuery = resolvedSearchParams?.q;
    if (typeof searchQuery === 'string' && searchQuery.trim()) {
        query = query.ilike('title', `%${searchQuery}%`);
    }

    const { data: articlesData, error } = await query;

    if (error) {
        console.error('Error fetching category articles:', error);
    }

    const articles: Article[] = (articlesData || []).map((item) => ({
        id: item.id,
        title: item.title,
        excerpt: item.excerpt,
        content: item.content,
        category: item.category,
        date: new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        imageUrl: item.image_url,
        author: item.author
    }));

    // Tabs
    const tabs = [
        { id: 'news', label: 'News', path: '/news/news' },
        { id: 'insight', label: 'Insight', path: '/news/insight' },
        { id: 'regulation', label: 'Regulation', path: '/news/regulation' },
    ];

    const currentTab = tabs.find(t => t.id === categoryLower || (categoryLower === 'all' && t.id === 'news'))?.id || 'news';


    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            <main className="flex-grow py-12">
                <div className="container mx-auto px-4">

                    {/* Page Header */}
                    <div className="mb-10 text-center max-w-2xl mx-auto">
                        <Badge variant="orange" className="mb-3">{categoryLower === 'all' ? 'News' : 'Category'}</Badge>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{displayTitle}</h1>
                        <p className="text-gray-600 font-medium">{displayDesc}</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center mb-12 border-b border-gray-200">
                        <nav className="flex space-x-8 -mb-px overflow-x-auto">
                            {tabs.map((tab) => (
                                <Link
                                    key={tab.id}
                                    href={tab.path}
                                    className={`pb-4 px-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${(categoryLower === tab.id || (categoryLower === 'policy' && tab.id === 'regulation'))
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
                            {articles.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 row-gap-12">
                                    {articles.map((article) => (
                                        <LargeArticleCard
                                            key={article.id}
                                            id={article.id}
                                            title={article.title}
                                            excerpt={article.excerpt}
                                            category={article.category}
                                            date={article.date}
                                            imageUrl={article.imageUrl}
                                            author={article.author}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-white rounded-lg border border-gray-200 shadow-sm">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">등록된 기사가 없습니다</h3>
                                    <p className="text-gray-500 mb-6">아직 이 카테고리에 등록된 뉴스가 없습니다.</p>
                                    <Link href="/news/all">
                                        <Button variant="outline">전체 뉴스 보기</Button>
                                    </Link>
                                </div>
                            )}
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
