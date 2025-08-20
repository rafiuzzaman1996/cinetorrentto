"use server";

// import { NextResponse } from "next/server";
export const getSocialLinks = async (searchParams: { page: number, limit: number }) => {
    try {
      const apiUrl = process.env.API_URL;
      const res = await fetch(`${apiUrl}/social-link?page=${searchParams.page}&limit=${searchParams.limit}`, {
        // next: { revalidate: 3600 },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch social-link: ${res.status}`);
      }

      const data = await res.json();
      return data || [];
    } catch (error) {
      console.error("Failed to fetch social-link:", error);
      return [];
    }
  }