"use server";

// import { NextResponse } from "next/server";
export const getFeaturedContent = async () => {
    try {
      const apiUrl = process.env.API_URL;
      const res = await fetch(`${apiUrl}/api/featured-content?page=1&limit=10`, {
        // next: { revalidate: 3600 },
      });

      console.log('🩸🩸 ~ res:', res);

      if (!res.ok) {
        throw new Error(`Failed to fetch featured content: ${res.status}`);
      }

      const data = await res.json();
      return data.data || [];
    } catch (error) {
      console.error("Failed to fetch featured content:", error);
      return [];
    }
  }