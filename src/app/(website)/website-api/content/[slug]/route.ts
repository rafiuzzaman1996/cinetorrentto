import {NextResponse} from 'next/server';

export async function GET(request: Request, {params}: {params: Promise<{slug: string}>}) {
    const slug = (await params).slug;
    try {
        const apiUrl = process.env.API_URL;
        const res = await fetch(`${apiUrl}/api/content/${slug}`, {});

        if (!res.ok) {
            return NextResponse.json({error: 'Content not found'}, {status: 404});
        }

        const data = await res.json();
        return NextResponse.json(data || []);
    } catch (error) {
        console.error('Failed to fetch Content:', error);
        return NextResponse.json({error: 'Failed to fetch Content'}, {status: 500});
    }
}
