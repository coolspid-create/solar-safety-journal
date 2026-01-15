"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { Article } from '@/lib/mockData';


export function Sidebar() {
    const [trendingNews, setTrendingNews] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTrending() {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('articles')
                    .select('id, title, created_at, category')
                    .order('created_at', { ascending: false })
                    .range(4, 9); // consistent with main page logic

                if (error) throw error;

                setTrendingNews(data.map(item => ({
                    id: item.id,
                    title: item.title,
                    excerpt: '', // Not used in sidebar
                    content: '', // Not used
                    category: item.category,
                    date: new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    imageUrl: '', // Not used
                    author: '' // Not used
                })));
            } catch (error) {
                console.error('Error fetching trending news:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchTrending();
    }, []);

    return (
        <aside className="space-y-8 lg:sticky lg:top-24 max-h-screen overflow-y-auto remove-scrollbar pb-8 self-start">

            {/* Sidebar Widget 1: Popular/Recent */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">인기 기사</h3>
                <div className="space-y-6">
                    {loading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
                        ))
                    ) : (
                        trendingNews.length > 0 ? trendingNews.map((item, index) => (
                            <Link key={item.id} href={`/news/${item.id}`} className="group block">
                                <div className="flex items-start gap-4">
                                    <span className="text-2xl font-bold text-gray-200 group-hover:text-[var(--color-solar-orange)] transition-colors">0{index + 1}</span>
                                    <div>
                                        <span className="text-xs text-[var(--color-solar-orange)] font-semibold mb-1 block">{item.category}</span>
                                        <h4 className="text-sm font-medium text-gray-800 leading-snug group-hover:text-[var(--color-solar-orange)] transition-colors line-clamp-2">
                                            {item.title}
                                        </h4>
                                    </div>
                                </div>
                            </Link>
                        )) : <p className="text-gray-500 text-sm">등록된 인기 기사가 없습니다.</p>
                    )}
                </div>
            </div>

            {/* Sidebar Widget 2: Categories */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Category</h3>
                <ul className="space-y-3">
                    {[
                        { id: 'news', label: 'News', path: '/news' },
                        { id: 'insight', label: 'Insight', path: '/insight' },
                        { id: 'regulation', label: 'Regulation', path: '/regulation' }
                    ].map((cat) => (
                        <li key={cat.id}>
                            <Link href={cat.path} className="flex items-center justify-between text-gray-600 hover:text-[var(--color-solar-orange)] group">
                                <span className="text-lg font-medium">{cat.label}</span>
                                <span className="bg-white px-2 py-0.5 rounded text-xs text-gray-400 group-hover:text-[var(--color-solar-orange)] border border-gray-200">View</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Sidebar Widget 3: Newsletter (Custom Form) */}


        </aside>
    );
}
