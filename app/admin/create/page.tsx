"use client";

import React, { useState, useEffect } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import RichTextEditor from '@/components/editor/RichTextEditor';
import ImageUploader from '@/components/admin/ImageUploader';

export default function CreateArticlePage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        category: 'News',
        author: '',
        content: '',
        excerpt: '',
        imageUrl: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!loading && !user) {
            router.push('/admin/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return <div className="min-h-screen flex items-center justify-center">로딩 중...</div>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const { error } = await supabase
                .from('articles')
                .insert([
                    {
                        title: formData.title,
                        category: formData.category,
                        author: formData.author || user.email?.split('@')[0], // Default author from email
                        content: formData.content, // HTML content from Editor
                        excerpt: formData.excerpt,
                        image_url: formData.imageUrl || null,
                        images: formData.imageUrl ? [formData.imageUrl] : [], // Keep existing array column sync for now
                    }
                ]);

            if (error) throw error;

            setSuccessMessage('기사가 성공적으로 발행되었습니다!');
            // Reset form
            setFormData({
                title: '',
                category: 'News',
                author: '',
                content: '',
                excerpt: '',
                imageUrl: '',
            });
        } catch (error: any) {
            console.error('Error submitting article:', error);
            setErrorMessage(error.message || '기사 발행에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">새 기사 작성</h1>

                    {successMessage && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {successMessage}
                        </div>
                    )}

                    {errorMessage && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">기사 제목</label>
                                <input
                                    type="text"
                                    id="title"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-solar-orange)]"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="예: 2026년 태양광 안전 전망"
                                />
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                                <select
                                    id="category"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-solar-orange)]"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="News">News</option>
                                    <option value="Insight">Insight</option>
                                    <option value="Regulation">Regulation</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">작성자</label>
                                <input
                                    type="text"
                                    id="author"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-solar-orange)]"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    placeholder="입력하지 않으면 이메일 ID 사용"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">대표 이미지 (썸네일)</label>
                            <ImageUploader
                                image={formData.imageUrl}
                                onImageChange={(url) => setFormData({
                                    ...formData,
                                    imageUrl: url || ''
                                })}
                            />
                        </div>

                        <div>
                            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">요약 (Excerpt)</label>
                            <textarea
                                id="excerpt"
                                rows={2}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-solar-orange)]"
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                placeholder="목록에 표시될 짧은 설명을 입력하세요."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">본문 내용</label>
                            <div className="prose-container">
                                <RichTextEditor
                                    content={formData.content}
                                    onChange={(html) => setFormData({ ...formData, content: html })}
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <Button
                                type="submit"
                                fullWidth
                                disabled={isSubmitting}
                                className={isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                            >
                                {isSubmitting ? '발행 중...' : '기사 발행'}
                            </Button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
