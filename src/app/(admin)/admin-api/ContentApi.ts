'use server';

import { ContentSchema } from "../manage/content/content.interface";
import { cookies } from 'next/headers';

export const getContents = async (searchParams: {page: number; limit: number; filter?: unknown, search: string}) => {
    try {
        const apiUrl = process.env.API_URL;
        // get accessToken from cookies
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

        const url = `${apiUrl}/content?page=${searchParams.page}&limit=${searchParams.limit}${searchParams.search ? `&search=${searchParams.search}` : ''}${filterParams ? `&${filterParams}` : ''}`;


        const res = await fetch(url, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
            },
            method: 'GET',
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch contents: ${res.status}`);
        }

        const data = await res.json();
        return data || [];
    } catch (error) {
        console.error('Failed to fetch contents:', error);
        return [];
    }
};
export const getContent = async (id: number) => {
    try {
        const apiUrl = process.env.API_URL;
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        const res = await fetch(`${apiUrl}/content/details/${id}`, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
            },
            method: 'GET',
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch content: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch content:', error);
        return error;
    }
};

export const submitContent = async (data: ContentSchema, mode: 'add' | 'edit' | 'view' | 'delete') => {
    try {
        const apiUrl = process.env.API_URL;
        // get accessToken from cookies
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        let url = `${apiUrl}/content`;
        let method: 'POST' | 'PUT' | 'DELETE' | 'GET' = 'POST';

        switch (mode) {
            case 'add':
                method = 'POST';
                break;
            case 'edit':
                if (!data.id) throw new Error('ID is required for edit');
                method = 'PUT';
                url += `/${data.id}`;
                break;
            case 'delete':
                if (!data.id) throw new Error('ID is required for delete');
                method = 'DELETE';
                url += `/${data.id}`;
                break;
            case 'view':
                method = 'GET';
                if (data.id) url += `/${data.id}`; // fetch single
                break;
            }

        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
            },
            body: mode === 'add' || mode === 'edit' ? JSON.stringify(data) : null,
        });

        if (!res.ok) {
            throw new Error(`Failed to ${mode} content: ${res.status}`);
        }

        // GET may return JSON or empty
        return method === 'DELETE' ? null : await res.json();
    } catch (error) {
        console.error(`Failed to ${mode} content:`, error);
        return error;
    }
};