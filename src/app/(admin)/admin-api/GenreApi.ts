'use server';
import { cookies } from 'next/headers';

export const getGenres = async (searchParams: {page: number; limit: number; filter?: unknown, search: string}) => {
    try {
        const apiUrl = process.env.API_URL;
        // get token from cookies
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        // 🔹 Convert filter into URLSearchParams, auto prepend $ilike
        let filterParams = '';
        if (searchParams.filter) {
            const params = new URLSearchParams();
            for (const [key, value] of Object.entries(searchParams.filter)) {
                const finalValue = value?.startsWith('$') ? value : `$ilike:${value}`;
                params.append(`filter.${key}`, finalValue);
            }
            filterParams = params.toString();
        }

        const url = `${apiUrl}/genre?page=${searchParams.page}&limit=${searchParams.limit}${searchParams.search ? `&search=${searchParams.search}` : ''}${filterParams ? `&${filterParams}` : ''}`;


        const res = await fetch(url, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
            },
            method: 'GET',
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch genres: ${res.status}`);
        }

        const data = await res.json();
        return data || [];
    } catch (error) {
        console.error('Failed to fetch genres:', error);
        return [];
    }
};
export const getGenre = async (id: number) => {
    try {
        const apiUrl = process.env.API_URL;
        // get token from cookies
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        const res = await fetch(`${apiUrl}/genre/${id}`, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
            },
            method: 'GET',
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch genre: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch genre:', error);
        return null;
    }
};

// getAllGenres

export const getAllGenres = async () => {
    try {
        const apiUrl = process.env.API_URL;
        // get accessToken from cookies
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        const res = await fetch(`${apiUrl}/genre?limit=1000`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'GET',
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch genres: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch genres:', error);
        return [];
    }
};