import React from "react"
import FeaturedCarousel from "./FeaturedCarousel"

interface FeaturedContentItem {
  img: string;
  id: number;
  // Add other known properties here as needed
}

const featuredContent: FeaturedContentItem[] = [
  {
    id: 1,
    img: "https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    },
    {
        id: 2,
        img: "https://lh3.googleusercontent.com/d/1MCvWHvomvU8EGK_JPPyfiTseXXN9OCss=w500",
    },
    {
        id: 3,
        img: "https://lh3.googleusercontent.com/d/1iWSAaIfD9b898cdddgUQ3GmY9Uf1JqJ1=w500",
    },
    {
        id: 4,
        img: "https://lh3.googleusercontent.com/d/1TW5iNTEaOSU1c-bf2Zol9pZoDn5vDJ9x=w500",

  }
]
const FeaturedContent = () => {
  return (
    <div className="w-full px-4 md:px-8 my-4">
      <FeaturedCarousel featuredContent={featuredContent}/>
    </div>
  )
}

export default FeaturedContent
