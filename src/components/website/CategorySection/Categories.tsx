import React from 'react'
import { CategorySection } from './CategorySection'
import { getCategoryWiseContent } from '@/app/(website)/website-api/contentApi';
import { Category } from '@/types/website/Category';

const Categories = async () => {
  const categories = await getCategoryWiseContent()
  return (
    <>
      {categories.length > 0 ? (categories.map((category: Category, i: number) => (
        <CategorySection key={i} category={category} />
      ))) : (
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-500">No Movie found</p>
        </div>
      )}
    </>
  )
}

export default Categories