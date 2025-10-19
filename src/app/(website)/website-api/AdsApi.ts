'use server';

// import { NextResponse } from "next/server";
export const getAds = async ({page, limit, filters}: {page: number; limit: number; filters?: unknown}) => {
    try {
        const apiUrl = `${process.env.API_URL}/api/ads?page=${page}&limit=${limit}${filters ? `&${filters}` : ''}`

        const res = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // next: { revalidate: 60 }, // Revalidate every 60 seconds
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch Ads: ${res.status}`);
        }

        const data = await res.json();
        return data || [];
    } catch (error) {
        console.error('Failed to fetch Ads:', error);
        return [];
    }
};
