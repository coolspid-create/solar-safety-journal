import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from './Badge';

interface ArticleCardProps {
    id: string | number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    imageUrl?: string | null;
    author?: string;
}

export function ArticleCard({ id, title, excerpt, category, date, imageUrl, author }: ArticleCardProps) {
    return (
        <Link href={`/news/article/${id}`} className="group flex flex-col bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full border border-transparent hover:border-gray-100">
            {/* Image Container - Aspect Video */}
            <div className="relative aspect-[16/9] w-full bg-gray-200 overflow-hidden">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Content with Generous Padding */}
            <div className="flex flex-col flex-grow p-6">

                {/* Meta: Category & Date */}
                <div className="flex items-center text-sm font-semibold text-[var(--color-solar-orange)] mb-3 space-x-2">
                    <span className="uppercase tracking-wider">{category}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500 font-medium">{date}</span>
                </div>

                {/* Title: Responsive Text Size, line-clamp-2 */}
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-3 leading-[1.3] group-hover:text-[var(--color-solar-orange)] transition-colors line-clamp-2">
                    {title}
                </h3>

                {/* Excerpt: Responsive size, 3 lines max */}
                <p className="text-sm md:text-base text-gray-600 line-clamp-3 leading-relaxed mb-4 flex-grow">
                    {excerpt}
                </p>

                {/* 'Read More' link style */}
                <div className="mt-auto pt-4 flex items-center text-[var(--color-solar-orange)] font-bold group-hover:underline decoration-2 underline-offset-4">
                    Read Article <span className="ml-2 text-xl">&rarr;</span>
                </div>
            </div>
        </Link>
    );
}
