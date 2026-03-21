import { NextRequest, NextResponse } from 'next/server';
import { searchPosts } from '@/lib/search';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query) {
        return NextResponse.json([]);
    }
    
    try {
        const results = await searchPosts(query);
        return NextResponse.json(results);
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }
}
