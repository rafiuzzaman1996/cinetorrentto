'use server';
import { cookies } from 'next/headers';
import { GenreForm } from '../manage/genre/genre.schema';
import { NextResponse } from 'next/server';

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
            throw (`Failed to fetch genres: ${res.status}`);
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
            throw (`Failed to fetch genre: ${res.status}`);
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
            throw (`Failed to fetch genres: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch genres:', error);
        return [];
    }
};

export const submitGenre = async (data: GenreForm, mode: 'add' | 'edit' | 'view' | 'delete') => {
    try {
        const token = (await cookies()).get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const apiUrl = process.env.API_URL;
        let url = `${apiUrl}/genre`;
        let method: 'POST' | 'PUT' | 'DELETE' | 'GET' = 'POST';

        switch (mode) {
            case 'add':
                method = 'POST';
                break;
            case 'edit':
                if (!data.id) throw ('ID is required for edit');
                method = 'PUT';
                url += `/${data.id}`;
                break;
            case 'delete':
                if (!data.id) throw ('ID is required for delete');
                method = 'DELETE';
                url += `/${data.id}`;
                break;
            case 'view':
                method = 'GET';
                if (data.id) url += `/${data.id}`; // fetch single
                break;
            }

        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            method,
            body: mode === 'add' || mode === 'edit' ? JSON.stringify(data) : null,
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw (`Failed to ${mode} genre: ${errorData.message || res.statusText}`);
        }

        // GET may return JSON or empty
        return method === 'DELETE' ? null : await res.json();
    } catch (error) {
        console.error(`Failed to ${mode} genre:`, error);
        throw error;
    }
};