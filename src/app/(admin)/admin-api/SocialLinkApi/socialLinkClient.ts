'use server';

import {SocialLinkInterface} from '@/app/(admin)/manage/social-link/social-link.interface';

// import { NextResponse } from "next/server";
export const getSocialLinks = async (searchParams: {page: number; limit: number; filter?: unknown, search: string}) => {
    try {
        const apiUrl = process.env.API_URL;
        // 🔹 Convert filter into URLSearchParams, auto prepend $ilike
        let filterParams = '';
        if (searchParams.filter) {
            console.log('🩸🩸 ~ searchParams.filter:', searchParams.filter);
            const params = new URLSearchParams();
            for (const [key, value] of Object.entries(searchParams.filter)) {
                // if caller didn’t already include an operator, default to $ilike
                const finalValue = value?.startsWith('$') ? value : `$ilike:${value}`;
                params.append(`filter.${key}`, finalValue);
            }
            filterParams = params.toString();
        }
        console.log('🩸🩸 ~ filterParams:', filterParams);

        const url = `${apiUrl}/social-link?page=${searchParams.page}&limit=${searchParams.limit}${searchParams.search ? `&search=${searchParams.search}` : ''}${filterParams ? `&${filterParams}` : ''}`;

        console.log('🩸🩸 ~ url:', url);

        // const filterParams = 'filter.'+new URLSearchParams(searchParams.filter as Record<string, string>).toString();
        // console.log('🩸🩸 ~ filterParams:', filterParams);
        // const url =`${apiUrl}/social-link?page=${searchParams.page}&limit=${searchParams.limit}&${filterParams}`;
        // console.log('🩸🩸 ~ url:', url);
        const res = await fetch(url, {
            // const res = await fetch(`${apiUrl}/social-link?filter.is_active=true&page=${searchParams.page}&limit=${searchParams.limit}`, {
            // next: { revalidate: 3600 },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch social-link: ${res.status}`);
        }

        const data = await res.json();
        return data || [];
    } catch (error) {
        console.error('Failed to fetch social-link:', error);
        return [];
    }
};

export const submitSocialLink = async (data: SocialLinkInterface, mode: 'add' | 'edit' | 'view' | 'delete') => {
    try {
        const apiUrl = process.env.API_URL;
        let url = `${apiUrl}/social-link`;
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
            headers: {'Content-Type': 'application/json'},
            body: mode === 'add' || mode === 'edit' ? JSON.stringify(data) : null,
        });

        if (!res.ok) {
            throw new Error(`Failed to ${mode} social-link: ${res.status}`);
        }

        // GET may return JSON or empty
        return method === 'DELETE' ? null : await res.json();
    } catch (error) {
        console.error(`Failed to ${mode} social-link:`, error);
        return null;
    }
};
