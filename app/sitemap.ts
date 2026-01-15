import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://solar-safety-journal.vercel.app';

    // Get articles for dynamic routes
    let articles: any[] = [];
    try {
        const { data } = await supabase
            .from('articles')
            .select('id, updated_at')
            .order('created_at', { ascending: false })
            .limit(100);
        articles = data || [];
    } catch (e) {
        console.error('Failed to fetch articles for sitemap', e);
    }

    const articleUrls = articles.map((article) => ({
        url: `${baseUrl}/news/article/${article.id}`,
        lastModified: new Date(article.updated_at || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/news`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/insight`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/regulation`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        ...articleUrls,
    ];
}
