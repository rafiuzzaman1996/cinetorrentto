'use server';

export const getFeaturedContent = async () => {
    try {
        const apiUrl = process.env.API_URL;
        const res = await fetch(`${apiUrl}/api/featured-content?page=1&limit=10`, {
        });

        if (!res.ok) {
            throw (`Failed to fetch featured content: ${res.status}`);
        }


        const data = await res.json();
        return data.data || [];
    } catch (error) {
        console.error('Failed to fetch featured content:', error);
        return [];
    }
};
