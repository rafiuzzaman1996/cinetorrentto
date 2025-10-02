import React from 'react'
import { CategorySection } from './CategorySection'
import { getCategoryWiseContent } from '@/app/(website)/website-api/contentApi';
import { Category } from '@/types/website/Category';

const Categories = async () => {
  const categories = await getCategoryWiseContent()
  return (
    <>
      {categories.map((category: Category, i: number) => (
        <CategorySection key={i} category={category} />
      ))}
    </>
  )
}

export default Categories