import React from "react"
import FeaturedCarousel from "./FeaturedCarousel"
import { getFeaturedContent } from "@/app/(website)/website-api/featuredApi";

export interface FeaturedContentItem {
  id: number;
  sequence: number;
  content: {
    id: number;
    poster_image_url: string;
    title: string,
    genres: {
      id: number;
      title: string;
    }[]
  }
}

const FeaturedContent = async () => {
  const featuredContent: FeaturedContentItem[] = await getFeaturedContent();

  return (
    <div className="w-full px-4 md:px-8 my-4">
      <FeaturedCarousel featuredContent={featuredContent} />
    </div>
  )
}

export default FeaturedContent
