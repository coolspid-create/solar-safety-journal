import React from 'react';
import Link from 'next/link';
import { Badge } from './Badge';

interface LargeArticleCardProps {
    id: string | number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    imageUrl?: string | null;
    author?: string;
}

export function LargeArticleCard({ id, title, excerpt, category, date, imageUrl, author }: LargeArticleCardProps) {
    return (
        <Link href={`/news/article/${id}`} className="group flex flex-col bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
            {/* Image Container - Aspect Video */}
            <div className="relative aspect-video w-full bg-gray-200 overflow-hidden rounded-lg">
                {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow pt-4 pb-2 px-1">
                {/* Meta: Category & Date */}
                <div className="flex items-center text-sm md:text-base text-gray-500 mb-2 space-x-3 font-medium">
                    <span className="text-[var(--color-solar-orange)] uppercase tracking-wide">{category}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{date}</span>
                </div>

                {/* Title - line-clamp-1 */}
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-[var(--color-solar-orange)] transition-colors line-clamp-1">
                    {title}
                </h3>

                {/* Excerpt - 2 lines max */}
                <p className="text-sm md:text-base text-gray-600 line-clamp-2 leading-relaxed mb-4 flex-grow">
                    {excerpt}
                </p>
            </div>
        </Link>
    );
}
