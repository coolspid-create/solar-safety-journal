
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // 1. Check if we can select from the table
        const { data: checkData, error: checkError } = await supabase
            .from('articles')
            .select('count')
            .limit(1)
            .single();

        if (checkError) {
            // If error code is '42P01' (undefined_table) in Postgres, but Supabase JS might return just an object
            return NextResponse.json({
                status: 'error',
                message: 'Failed to access articles table. It might not exist.',
                details: checkError
            }, { status: 500 });
        }

        // 2. If table exists, insert sample data
        const { data: insertData, error: insertError } = await supabase
            .from('articles')
            .insert([
                {
                    title: '2026년 태양광 안전 규정 업데이트',
                    category: '정책/법규',
                    excerpt: '에너지부는 다음 달부터 대규모 태양광 발전소에 대한 더 엄격한 안전 프로토콜을 발표했습니다.',
                    content: '<p>에너지부가 대규모 태양광 발전소에 대한 새로운 안전 규정을 공식 발표했습니다...</p>',
                    author: '김철수',
                    image_url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1000'
                }
            ])
            .select();

        if (insertError) {
            return NextResponse.json({ status: 'error', message: 'Table exists but insert failed', details: insertError }, { status: 500 });
        }

        return NextResponse.json({ status: 'success', message: 'Table exists and sample article inserted', data: insertData }, { status: 200 });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
