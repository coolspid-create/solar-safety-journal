import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        // Simulate backend processing time
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Here you would typically insert into Supabase:
        // const { error } = await supabase.from('subscribers').insert({ email });

        console.log(`[Mock Newsletter API] New subscriber: ${email}`);

        return NextResponse.json({ message: 'Subscribed successfully', email });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
