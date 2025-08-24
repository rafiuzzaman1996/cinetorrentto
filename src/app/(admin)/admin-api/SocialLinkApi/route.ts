"use server";

import { SocialLinkInterface } from "../../manage/social-link/social-link.interface";

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

  export const submitSocialLink = async (
  data: SocialLinkInterface,
  mode: "add" | "edit" | "view" | "delete"
) => {
  try {
    const apiUrl = process.env.API_URL
    let url = `${apiUrl}/social-link`
    let method: "POST" | "PUT" | "DELETE" | "GET" = "POST"

    switch (mode) {
      case "add":
        method = "POST"
        break
      case "edit":
        if (!data.id) throw new Error("ID is required for edit")
        method = "PUT"
        url += `/${data.id}`
        break
      case "delete":
        if (!data.id) throw new Error("ID is required for delete")
        method = "DELETE"
        url += `/${data.id}`
        break
      case "view":
        method = "GET"
        if (data.id) url += `/${data.id}` // fetch single
        break
    }

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: mode === "add" || mode === "edit" ? JSON.stringify(data) : null,
    })

    if (!res.ok) {
      throw new Error(`Failed to ${mode} social-link: ${res.status}`)
    }

    // GET may return JSON or empty
    return method === "DELETE" ? null : await res.json()
  } catch (error) {
    console.error(`Failed to ${mode} social-link:`, error)
    return null
  }
}