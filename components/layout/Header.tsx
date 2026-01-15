"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();
    const searchParams = useSearchParams();
    const { user } = useAuth();

    const toggleLanguage = () => {
        setLanguage(language === 'ko' ? 'en' : 'ko');
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = '/';
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                {/* Logo */}
                <Link href="/" className="group flex items-center gap-3 shrink-0 transition-transform duration-300 hover:-translate-y-0.5">
                    {/* Icon with interactive glow */}
                    <div className="relative h-9 w-9 bg-gradient-to-br from-[var(--color-solar-orange)] to-orange-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-all duration-300">
                        <svg className="w-5 h-5 text-white transform group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    {/* Text Logo */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1 font-['Montserrat',sans-serif] tracking-tighter leading-none">
                        <span className="text-xl sm:text-2xl font-extrabold text-[var(--color-solar-orange)]">Solar</span>
                        <span className="text-xl sm:text-2xl font-light text-slate-900">Safety Journal</span>
                    </div>
                </Link>

                {/* Search Bar (Desktop) */}
                <div className="hidden md:flex flex-grow max-w-md mx-8">
                    <form action="/search" method="GET" className="w-full relative">
                        <input
                            type="text"
                            name="q"
                            placeholder={language === 'ko' ? '기사 검색...' : 'Search articles...'}
                            className="w-full pl-10 pr-4 py-1.5 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-[var(--color-solar-orange)] focus:ring-1 focus:ring-[var(--color-solar-orange)] transition-shadow"
                            defaultValue={searchParams.get('q') || ''}
                        />
                        <button type="submit" className="absolute left-3.5 top-1/2 -translate-y-1/2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </form>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
                    <Link href="/news" className="text-xl font-bold text-gray-800 hover:text-[var(--color-solar-orange)] transition-colors">
                        News
                    </Link>
                    <Link href="/insight" className="text-xl font-bold text-gray-800 hover:text-[var(--color-solar-orange)] transition-colors">
                        Insight
                    </Link>
                    <Link href="/regulation" className="text-xl font-bold text-gray-800 hover:text-[var(--color-solar-orange)] transition-colors">
                        Regulation
                    </Link>
                    {user ? (
                        <button onClick={handleLogout} className="text-lg font-semibold text-red-600 hover:text-red-700 transition-colors">
                            Logout
                        </button>
                    ) : (
                        <Link href="/admin/login" className="text-sm font-medium text-gray-600 hover:text-[var(--color-solar-orange)] transition-colors">
                            Admin
                        </Link>
                    )}

                    <div className="h-4 w-px bg-gray-300 mx-2"></div>

                    <button
                        onClick={toggleLanguage}
                        className="text-sm font-bold text-[var(--color-solar-orange)] hover:text-[var(--color-solar-orange-hover)] transition-colors"
                    >
                        {language === 'ko' ? 'EN' : 'KO'}
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-md hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className="sr-only">Toggle Menu</span>
                    {isMenuOpen ? (
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-200">
                    <div className="container mx-auto px-4 py-4 space-y-3 flex flex-col">
                        <Link
                            href="/news"
                            className="text-base font-medium text-gray-600 hover:text-[var(--color-solar-orange)]"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            News
                        </Link>
                        <Link
                            href="/insight"
                            className="text-base font-medium text-gray-600 hover:text-[var(--color-solar-orange)]"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Insight
                        </Link>
                        <Link
                            href="/regulation"
                            className="text-base font-medium text-gray-600 hover:text-[var(--color-solar-orange)]"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Regulation
                        </Link>
                        <Link
                            href="/admin/create"
                            className="text-base font-medium text-gray-600 hover:text-[var(--color-solar-orange)]"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Admin
                        </Link>
                        <button
                            onClick={() => {
                                toggleLanguage();
                                setIsMenuOpen(false);
                            }}
                            className="text-left text-base font-medium text-[var(--color-solar-orange)]"
                        >
                            {language === 'ko' ? 'Switch to English' : '한국어로 전환'}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
