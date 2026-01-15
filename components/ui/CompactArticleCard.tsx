import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from './Badge';

interface CompactArticleCardProps {
    id: string | number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    imageUrl?: string | null;
    author?: string;
}

export function CompactArticleCard({ id, title, excerpt, category, date, imageUrl, author }: CompactArticleCardProps) {
    return (
        <Link href={`/news/article/${id}`} className="group flex bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 h-32">
            {/* Image Container - Fixed Width - Increased from w-24 to w-32 for better balance */}
            <div className="relative w-32 md:w-40 h-full bg-gray-200 flex-shrink-0">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 128px, 160px"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Content - Optimized spacing */}
            <div className="flex flex-col flex-grow py-3 px-4 justify-between min-w-0">
                <div>
                    {/* Meta Top */}
                    <div className="flex items-center text-xs font-medium text-gray-500 mb-2 space-x-2">
                        <span className="text-[var(--color-solar-orange)] font-bold uppercase tracking-wide truncate">{category}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>{date}</span>
                    </div>

                    {/* Title - Text increased, 1 line max */}
                    <h3 className="text-base md:text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-[var(--color-solar-orange)] transition-colors mb-1">
                        {title}
                    </h3>

                    {/* Excerpt - Added, 2 lines max */}
                    <p className="text-xs md:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {excerpt}
                    </p>
                </div>
            </div>
        </Link>
    );
}
