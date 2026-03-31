import React from "react"
import FeaturedCarousel from "./FeaturedCarousel"
import { getFeaturedContent } from "@/app/(website)/website-api/featuredApi";
import { Content } from "@/types/website/Content";

export interface FeaturedContentItem {
  id: number;
  sequence: number;
  content: Content;
}

const FeaturedContent = async () => {
  const featuredContent: FeaturedContentItem[] = await getFeaturedContent();

  return (
    <div className="w-full px-4 md:px-8 my-4">
      {featuredContent.length > 0 ? (
        <FeaturedCarousel featuredContent={featuredContent} />
      ) : null}
    </div>
  )
}

export default FeaturedContent
