"use server";

// import { NextResponse } from "next/server";
export const getContentsByCategory = async (searchParams: { slug: string | string[], page: number }) => {
    try {
      const apiUrl = process.env.API_URL;
      const res = await fetch(`${apiUrl}/api/contents?page=${searchParams.page}&filter.category.slug=${searchParams.slug}`, {
        // next: { revalidate: 3600 },
      });


      if (!res.ok) {
        throw (`Failed to fetch category: ${res.status}`);
      }

      const data = await res.json();
      return data || [];
    } catch (error) {
      console.error("Failed to fetch category:", error);
      return [];
    }
  }