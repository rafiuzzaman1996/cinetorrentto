"use server";

// import { NextResponse } from "next/server";
export const getCategoryWiseContent = async () => {
    try {
      const apiUrl = process.env.API_URL;
      const res = await fetch(`${apiUrl}/api/category/contents`, {
        // next: { revalidate: 3600 },
      });


      if (!res.ok) {
        throw new Error(`Failed to fetch category: ${res.status}`);
      }

      const data = await res.json();
      return data || [];
    } catch (error) {
      console.error("Failed to fetch category:", error);
      return [];
    }
  }
export const getContentBySlug = async (slug: string) => {
    try {
      const apiUrl = process.env.API_URL;
      const res = await fetch(`${apiUrl}/api/contents/${slug}`, {
      });


      if (!res.ok) {
        throw new Error(`Failed to fetch Content: ${res.status}`);
      }

      const data = await res.json();
      return data || [];
    } catch (error) {
      console.error("Failed to fetch Content:", error);
      return [];
    }
  }
export const getContentsBySearch = async (q: string, page: number) => {
    try {
      const apiUrl = process.env.API_URL;
      const res = await fetch(`${apiUrl}/api/contents?search=${q}&page=${page}`, {
      });


      if (!res.ok) {
        throw new Error(`Failed to fetch Content: ${res.status}`);
      }

      const data = await res.json();
      return data || [];
    } catch (error) {
      console.error("Failed to fetch Content:", error);
      return [];
    }
  }

