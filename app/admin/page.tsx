"use client";

import React, { useEffect, useState } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Edit, FileText, Trash2 } from 'lucide-react';

interface Article {
    id: string;
    title: string;
    category: string;
    author: string;
    created_at: string;
    image_url: string | null;
}

export default function AdminDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoadingArticles, setIsLoadingArticles] = useState(true);

    const handleDelete = async (id: string) => {
        if (!confirm("정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) return;

        try {
            const { error } = await supabase
                .from('articles')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setArticles(prev => prev.filter(article => article.id !== id));
            alert("기사가 삭제되었습니다.");
        } catch (error) {
            console.error("Delete error:", error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        if (!loading && !user) {
            router.push('/admin/login');
        }
    }, [user, loading, router]);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const { data, error } = await supabase
                    .from('articles')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setArticles(data || []);
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setIsLoadingArticles(false);
            }
        }

        if (user) {
            fetchArticles();
        }
    }, [user]);

    // Helper to map legacy/DB categories to new English standard
    const normalizeCategory = (cat: string) => {
        if (!cat) return 'News';
        const lower = cat.toLowerCase();
        if (lower === 'safety' || lower === 'safety guide' || lower === '안전 가이드') return 'Insight';
        if (lower === 'regulation' || lower === 'policy' || lower === '정책/법규') return 'Regulation';
        if (lower === 'maintenance' || lower === '유지보수') return 'Insight'; // Mapping Maintenance to Insight as requested/logical
        if (lower === 'news' || lower === 'market' || lower === '산업 뉴스') return 'News';
        return cat; // Fallback
    };

    if (loading || !user) {
        return <div className="min-h-screen flex items-center justify-center">로딩 중...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
                        <Link href="/admin/create">
                            <Button className="flex items-center gap-2">
                                <Plus size={18} />
                                새 기사 작성
                            </Button>
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100 text-sm uppercase text-gray-500 font-bold">
                                        <th className="px-6 py-5 w-[45%]">제목</th>
                                        <th className="px-6 py-5 w-[15%]">카테고리</th>
                                        <th className="px-6 py-5 w-[15%]">작성자</th>
                                        <th className="px-6 py-5 w-[15%]">작성일</th>
                                        <th className="px-6 py-5 w-[10%] text-right">관리</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {isLoadingArticles ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                                                기사 목록을 불러오는 중...
                                            </td>
                                        </tr>
                                    ) : articles.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                                                작성된 기사가 없습니다.
                                            </td>
                                        </tr>
                                    ) : (
                                        articles.map((article) => (
                                            <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center">
                                                        {article.image_url ? (
                                                            <div className="w-12 h-12 rounded-lg bg-gray-200 mr-4 overflow-hidden flex-shrink-0 relative">
                                                                <img
                                                                    src={article.image_url}
                                                                    alt=""
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="w-12 h-12 rounded-lg bg-gray-100 mr-4 flex items-center justify-center text-gray-400 flex-shrink-0">
                                                                <FileText size={20} />
                                                            </div>
                                                        )}
                                                        <span className="font-bold text-gray-900 text-base line-clamp-1">
                                                            {article.title}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold 
                                                        ${normalizeCategory(article.category) === 'News' ? 'bg-blue-50 text-blue-700' :
                                                            normalizeCategory(article.category) === 'Insight' ? 'bg-orange-50 text-orange-700' :
                                                                'bg-green-50 text-green-700'}`}>
                                                        {normalizeCategory(article.category)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-gray-700 font-medium text-sm">
                                                    {article.author}
                                                </td>
                                                <td className="px-6 py-5 text-gray-500 text-sm">
                                                    {new Date(article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                </td>
                                                <td className="px-6 py-5 text-right space-x-2">
                                                    <Link href={`/admin/edit/${article.id}`}>
                                                        <button
                                                            className="text-gray-400 hover:text-[var(--color-solar-orange)] transition-colors p-2 rounded-full hover:bg-orange-50"
                                                            title="Edit Article"
                                                        >
                                                            <Edit size={20} />
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(article.id)}
                                                        className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
                                                        title="Delete Article"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
