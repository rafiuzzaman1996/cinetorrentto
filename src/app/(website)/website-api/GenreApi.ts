"use server";

// import { NextResponse } from "next/server";
export const getGenres = async () => {
    try {
      const apiUrl = process.env.API_URL;
      const res = await fetch(`${apiUrl}/api/genres`, {
        // next: { revalidate: 3600 },
      });


      if (!res.ok) {
        throw new Error(`Failed to fetch Genre: ${res.status}`);
      }

      const data = await res.json();
      return data || [];
    } catch (error) {
      console.error("Failed to fetch Genre:", error);
      return [];
    }
  }
