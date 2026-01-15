import React from 'react';
import { LargeArticleCard } from "@/components/ui/LargeArticleCard";
import { Button } from "@/components/ui/Button";
import Link from 'next/link';

interface Article {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    imageUrl: string | null;
    author: string;
}

interface ArticleGridProps {
    articles: Article[];
    emptyMessage?: string;
    emptyDescription?: string;
}

export function ArticleGrid({
    articles,
    emptyMessage = "등록된 기사가 없습니다",
    emptyDescription = "아직 이 카테고리에 등록된 뉴스가 없습니다."
}: ArticleGridProps) {

    if (articles.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">{emptyMessage}</h3>
                <p className="text-gray-500 mb-6">{emptyDescription}</p>
                <Link href="/news">
                    <Button variant="outline">전체 뉴스 보기</Button>
                </Link>
            </div>
        );
    }

    return (
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
    );
}
