'use server';

import { SocialLinkInterface } from '@/app/(admin)/manage/social-link/social-link.interface';
import { decrypt } from '@/app/helper/encrypt-decrypt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from "next/server";

export const getSocialLinks = async (searchParams: {
  page: number;
  limit: number;
  filter?: unknown;
  search: string;
}) => {
  try {
    // Get the token directly from cookies instead of using getServerSession
    const cookieStore = cookies();
    // console all cookies
    console.log((await cookieStore).getAll());
    const nextAuthSessionToken = (await cookieStore).get('next-auth.session-token')?.value;
    console.log('🩸🩸 ~ nextAuthSessionToken:', nextAuthSessionToken);

    if (!nextAuthSessionToken) {
      console.log('No session token found');
      redirect('/login');
    }

    // If you need to decrypt the token, do it here
    const accessToken = decrypt(nextAuthSessionToken);


    const apiUrl = process.env.API_URL;
    // 🔹 Convert filter into URLSearchParams, auto prepend $ilike
    let filterParams = '';
    if (searchParams.filter && typeof searchParams.filter === 'object') {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(searchParams.filter as Record<string, string>)) {
        // if caller didn't already include an operator, default to $ilike
        const finalValue = value?.startsWith('$') ? value : `$ilike:${value}`;
        params.append(`filter.${key}`, finalValue);
      }
      filterParams = params.toString();
    }

    const url = `${apiUrl}/social-link?page=${searchParams.page}&limit=${searchParams.limit}${
      searchParams.search ? `&search=${searchParams.search}` : ''
    }${filterParams ? `&${filterParams}` : ''}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${decrypt(accessToken)}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure fresh data
    });

    if (!res.ok) {
      if (res.status === 401) {
        // Token expired or invalid
        console.log('Token expired or invalid');
        // You can redirect the user to the login page
        // redirect('/login');
      }
      throw new Error(`Failed to fetch social-link: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error('Failed to fetch social-link:', error);

    // If it's an authentication error, redirect to signin
    if (error instanceof Error && error.message.includes('401')) {
      redirect('/login');
    }

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
