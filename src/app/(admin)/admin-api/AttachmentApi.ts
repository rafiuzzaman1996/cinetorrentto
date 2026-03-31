'use server';

import { cookies } from 'next/headers';

export const getAttachments = async (searchParams: {page: number; limit: number; filter?: unknown, search: string}) => {
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

        const url = `${apiUrl}/attachment?page=${searchParams.page}&limit=${searchParams.limit}${searchParams.search ? `&search=${searchParams.search}` : ''}${filterParams ? `&${filterParams}` : ''}`;


        const res = await fetch(url, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
            },
            method: 'GET',
        });

        if (!res.ok) {
            throw (`Failed to fetch contents: ${res.status}`);
        }

        const data = await res.json();
        return data || [];
    } catch (error) {
        console.error('Failed to fetch contents:', error);
        return [];
    }
};

export const uploadAttachments = async (files: File[]) => {
    try {
        const apiUrl = process.env.API_URL;
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });

        const res = await fetch(`${apiUrl}/attachment/upload`, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
            },
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            throw (`Failed to import contents. ${await res.text()}`);

        }

        const data = await res.json();
        return data || [];
    } catch (error) {
        console.error('Failed to upload attachments:', error);
        throw error;
    }
};

 export const deleteAttachment = async (id: string) => {
        try {
            const apiUrl = process.env.API_URL;
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        const res = await fetch(`${apiUrl}/attachment/${id}`, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
            },
            method: 'DELETE',
        });

        if (!res.ok) {
            throw (`Failed to delete Attachment. ${await res.text()}`);
        }

        const data = await res.json();
            return data || true
        } catch (error) {
            throw error
        }
    };