"use client";

import React, { useState, useEffect } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { useAuth } from '@/context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import RichTextEditor from '@/components/editor/RichTextEditor';
import ImageUploader from '@/components/admin/ImageUploader';

export default function EditArticlePage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const [formData, setFormData] = useState({
        title: '',
        category: 'Safety',
        author: '',
        content: '',
        excerpt: '',
        imageUrl: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!loading && !user) {
            router.push('/admin/login');
        }
    }, [user, loading, router]);

    useEffect(() => {
        async function fetchArticle() {
            if (!id) return;

            try {
                const { data, error } = await supabase
                    .from('articles')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;

                if (data) {
                    setFormData({
                        title: data.title || '',
                        category: data.category || 'News',
                        author: data.author || '',
                        content: data.content || '',
                        excerpt: data.excerpt || '',
                        imageUrl: data.image_url || '',
                    });
                }
            } catch (error) {
                console.error('Error fetching article:', error);
                setErrorMessage('기사 정보를 불러오는 데 실패했습니다.');
            } finally {
                setIsLoadingData(false);
            }
        }

        if (user && id) {
            fetchArticle();
        }
    }, [user, id]);

    if (loading || !user || isLoadingData) {
        return <div className="min-h-screen flex items-center justify-center">로딩 중...</div>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage('');
        setErrorMessage('');

        console.log('Update target ID:', id);

        if (!id) {
            setErrorMessage('유효하지 않은 기사 ID입니다.');
            setIsSubmitting(false);
            return;
        }

        try {
            // Data Type Validation & Filtering
            let finalImageUrl = formData.imageUrl;
            if (Array.isArray(finalImageUrl)) {
                finalImageUrl = finalImageUrl.length > 0 ? finalImageUrl[0] : '';
            } else if (!finalImageUrl && typeof finalImageUrl !== 'string') {
                finalImageUrl = '';
            }

            // Construct strictly filtered payload
            // User requested ONLY: title, content, excerpt, category, author, image_url
            // We explicitly EXCLUDE id, created_at, updated_at
            const updatePayload = {
                title: formData.title,
                category: formData.category,
                author: formData.author || user.email?.split('@')[0],
                content: formData.content,
                excerpt: formData.excerpt,
                image_url: finalImageUrl || null,
            };

            console.log('Final Update Payload:', updatePayload);

            // Convert ID to number as requested
            const numericId = Number(id);
            if (isNaN(numericId)) {
                throw new Error('Invalid ID format');
            }

            const { error } = await supabase
                .from('articles')
                .update(updatePayload)
                .eq('id', numericId);

            if (error) {
                console.error('Supabase Update Error Detailed:');
                console.dir(error); // Enhanced logging
                console.log('Error JSON:', JSON.stringify(error, null, 2)); // Detailed JSON logging
                throw error;
            }

            setSuccessMessage('기사가 성공적으로 수정되었습니다!');
            // Optional: Redirect after success
            setTimeout(() => {
                router.push('/admin');
            }, 1000);

        } catch (error: any) {
            console.error('Catch Block Error:', error);
            console.dir(error);

            const msg = error.message || '기사 수정에 실패했습니다.';
            const details = error.details ? ` (${error.details})` : '';
            const hint = error.hint ? ` [Hint: ${error.hint}]` : '';

            setErrorMessage(`오류 발생: ${msg}${details}${hint}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">기사 수정</h1>

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

                        <div className="pt-4 border-t border-gray-100 flex gap-4">
                            <Button
                                type="submit"
                                fullWidth
                                disabled={isSubmitting}
                                className={isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                            >
                                {isSubmitting ? '수정 저장 중...' : '수정 사항 저장'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                fullWidth
                                onClick={() => router.push('/admin')}
                            >
                                취소
                            </Button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
