"use client";

import { useEffect, useState } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { CompactArticleCard } from "@/components/ui/CompactArticleCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/context/LanguageContext";
import { supabase } from '@/lib/supabase';
import { Article } from '@/lib/mockData';
import Link from 'next/link';
import NewsletterForm from '@/components/news/NewsletterForm';

export default function Home() {
  const { t } = useLanguage();
  const [latestNews, setLatestNews] = useState<Article[]>([]);
  const [safetyNews, setSafetyNews] = useState<Article[]>([]);
  const [regulationNews, setRegulationNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllSections() {
      try {
        setLoading(true);

        // 1. Fetch Latest News (Top 6)
        const latestQuery = supabase
          .from('articles')
          .select('*')
          .eq('category', 'News')
          .order('created_at', { ascending: false })
          .limit(6);

        // 2. Fetch Insight (Top 4)
        const safetyQuery = supabase
          .from('articles')
          .select('*')
          .in('category', ['Insight', 'Safety', 'Maintenance'])
          .order('created_at', { ascending: false })
          .limit(4);

        // 3. Fetch Regulation (Top 4)
        const regulationQuery = supabase
          .from('articles')
          .select('*')
          .eq('category', 'Regulation')
          .order('created_at', { ascending: false })
          .limit(4);

        const [latestRes, safetyRes, regulationRes] = await Promise.all([
          latestQuery,
          safetyQuery,
          regulationQuery
        ]);

        if (latestRes.error) throw latestRes.error;
        if (safetyRes.error) throw safetyRes.error;
        if (regulationRes.error) throw regulationRes.error;

        const formatData = (data: any[]): Article[] => data.map((item) => ({
          id: item.id,
          title: item.title,
          excerpt: item.excerpt,
          content: item.content,
          category: item.category,
          date: new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          imageUrl: item.image_url,
          author: item.author
        }));

        setLatestNews(formatData(latestRes.data || []));
        setSafetyNews(formatData(safetyRes.data || []));
        setRegulationNews(formatData(regulationRes.data || []));

      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllSections();
  }, []);

  const renderSectionLoader = (count: number = 4) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=2000&auto=format&fit=crop"
              alt="Solar Panel Maintenance"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-dark-grey)] via-[var(--color-dark-grey)]/90 to-transparent"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10 text-white">
            <div className="max-w-3xl">
              <Badge variant="orange" className="mb-4">{t('hero.badge')}</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight whitespace-pre-line drop-shadow-md">
                {t('hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="primary">{t('hero.cta')}</Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">{t('hero.subscribe')}</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section with Sidebar */}
        <section className="py-16">
          <div className="container mx-auto px-4">

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Left: Main Content (75%) */}
              <div className="lg:w-3/4 space-y-20">

                {/* 1. Latest Industry News (2x2 Grid) */}
                {/* 1. Latest Industry News (3 Cols) */}
                <div>
                  <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
                    <h2 className="text-3xl font-bold text-gray-900">News</h2>
                    <Link href="/news" className="text-[var(--color-solar-orange)] font-semibold hover:underline text-lg">View All &rarr;</Link>
                  </div>
                  {loading ? renderSectionLoader(4) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {latestNews.length > 0 ? latestNews.map((news) => (
                        <ArticleCard
                          key={news.id}
                          id={news.id}
                          title={news.title}
                          excerpt={news.excerpt}
                          category={news.category || 'News'}
                          date={news.date}
                          imageUrl={news.imageUrl}
                          author={news.author}
                        />
                      )) : (
                        <div className="col-span-full text-center text-gray-500 py-10">
                          No news available.
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Split Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                  {/* 2. Safety Guide (Bottom Left) */}
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-2">
                      <h3 className="text-3xl font-bold text-gray-900">Insight</h3>
                      <Badge variant="orange" className="text-sm px-2">Safety</Badge>
                    </div>

                    <div className="flex-grow space-y-6">
                      {loading ? renderSectionLoader(2) : (
                        <>
                          {safetyNews.length > 0 ? safetyNews.map((news) => (
                            <CompactArticleCard
                              key={news.id}
                              id={news.id}
                              title={news.title}
                              excerpt={news.excerpt}
                              category={news.category}
                              date={news.date}
                              imageUrl={news.imageUrl}
                              author={news.author}
                            />
                          )) : (
                            <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg">
                              No insights available.
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    <div className="mt-8 pt-4 border-t border-gray-100">
                      <Link href="/insight">
                        <Button variant="outline" fullWidth size="lg" className="text-lg font-bold text-gray-700 hover:text-[var(--color-solar-orange)]">
                          View All Insight
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* 3. Policy/Regulation (Bottom Right) */}
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-2">
                      <h3 className="text-3xl font-bold text-gray-900">Regulation</h3>
                      <Badge variant="green" className="text-sm px-2">Policy</Badge>
                    </div>

                    <div className="flex-grow space-y-6">
                      {loading ? renderSectionLoader(2) : (
                        <>
                          {regulationNews.length > 0 ? regulationNews.map((news) => (
                            <CompactArticleCard
                              key={news.id}
                              id={news.id}
                              title={news.title}
                              excerpt={news.excerpt}
                              category={news.category}
                              date={news.date}
                              imageUrl={news.imageUrl}
                              author={news.author}
                            />
                          )) : (
                            <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg">
                              No regulations available.
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    <div className="mt-8 pt-4 border-t border-gray-100">
                      <Link href="/regulation">
                        <Button variant="outline" fullWidth size="lg" className="text-lg font-bold text-gray-700 hover:text-[var(--color-solar-orange)]">
                          View All Regulation
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Sidebar (25%) */}
              <div className="lg:w-1/4">
                <Sidebar />
              </div>
            </div>

          </div>
        </section>

        {/* Bottom CTA Section */}
        {/* Bottom CTA Section - Newsletter */}
        <section className="bg-orange-50/50 py-20 border-t border-orange-100">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="orange" className="mb-4">Newsletter</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">
              태양광 전문가의 인사이트를 매주 메일함으로
            </h2>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              최신 정책 변화부터 현장 안전 노하우까지, <br className="hidden sm:block" />
              핵심 요약본을 무료로 보내드립니다.
            </p>

            {/* Newsletter Form Component */}
            <NewsletterForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
