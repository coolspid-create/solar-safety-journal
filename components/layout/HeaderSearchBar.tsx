"use client";

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export function HeaderSearchBar() {
    const { language } = useLanguage();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const q = formData.get('q') as string;
        if (q.trim()) {
            router.push(`/search?q=${encodeURIComponent(q.trim())}`);
        }
    };

    return (
        <div className="hidden md:flex flex-grow max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
                <input
                    type="text"
                    name="q"
                    placeholder={language === 'ko' ? '기사 검색...' : 'Search articles...'}
                    className="w-full pl-10 pr-4 py-1.5 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-[var(--color-solar-orange)] focus:ring-1 focus:ring-[var(--color-solar-orange)] transition-shadow"
                    defaultValue={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute left-3.5 top-1/2 -translate-y-1/2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </form>
        </div>
    );
}
