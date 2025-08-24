import React from 'react'
import CategorySection from '../CategorySection'
import { getCategoryWiseContent } from '@/app/api/content-api/contentApi';

export interface Content {
    title: string;
    genres: {
        id: number,
        title: string
    }[];
    release_date: number;
    rating: number;
    poster_image_url: string;
}

export interface Category {
    id: number;
    title: string;
    slug: string;
    contents: Content[];
}




const Categories = async () => {
    const categories = await getCategoryWiseContent()
  return (
    <>
        {categories.map((category: Category, i: number) => (
            <CategorySection key={i} category={category}/>
        ))}
    </>
  )
}

export default Categories