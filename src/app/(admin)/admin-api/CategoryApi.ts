'use server';

import {cookies} from 'next/headers';
import { CategoryForm } from '../manage/category/category.schema';
import { NextResponse } from 'next/server';

export const getCategories = async (searchParams: {page: number; limit: number; filter?: unknown; search: string}) => {
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

        const url = `${apiUrl}/category?page=${searchParams.page}&limit=${searchParams.limit}${searchParams.search ? `&search=${searchParams.search}` : ''}${filterParams ? `&${filterParams}` : ''}`;

        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            method: 'GET',
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch categories: ${res.status}`);
        }

        const data = await res.json();
        return data || [];
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return [];
    }
};
export const getCategory = async (id: number) => {
    try {
        const apiUrl = process.env.API_URL;
        // get accessToken from cookies
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        const res = await fetch(`${apiUrl}/category/${id}`, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch category: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch category:', error);
        return null;
    }
};

// getAllCategories

export const getAllCategories = async () => {
    try {
        const apiUrl = process.env.API_URL;
        // get accessToken from cookies
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        const res = await fetch(`${apiUrl}/category?limit=1000`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            method: 'GET',
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch categories: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return [];
    }
};

export const submitCategory = async (data: CategoryForm, mode: 'add' | 'edit' | 'view' | 'delete') => {
    try {
        const token = (await cookies()).get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const apiUrl = process.env.API_URL;
        let url = `${apiUrl}/category`;
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
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            method,
            body: mode === 'add' || mode === 'edit' ? JSON.stringify(data) : null,
        });

        if (!res.ok) {
            throw new Error(`Failed to ${mode} category: ${res.status}`);
        }

        // GET may return JSON or empty
        return method === 'DELETE' ? null : await res.json();
    } catch (error) {
        console.error(`Failed to ${mode} category:`, error);
        return null;
    }
};
