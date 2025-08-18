import React from "react"
import Image from "next/image"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Category } from "./CategorySections/Categories"

interface FeaturedCarouselProps {
    category: Category;
  }
const CategorySection: React.FC<FeaturedCarouselProps> = ({ category }) => {
// const CategorySection = ({category: Category}) => {
    return (
        <div className="my-8">
            <div className="flex items-center justify-between mb-4 px-4 md:px-8">
                <h2 className="text-xl font-bold text-orange-500">{category.title}</h2>
                <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                    SEE ALL
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 px-4 md:px-8">
                {category.contents.slice(0, 6).map((content, index) => (
                    <Card key={index} className="bg-gray-800 p-0 gap-2 dark:bg-gray-900 overflow-hidden border-0 duration-500 hover:scale-105">
                        <Image
                            src={content.img}
                            alt={content.title}
                            width={500}
                            height={500}  // increased height
                            className="h-100 object-cover object-center transition-transform"
                        />
                        <CardContent className="p-2">
                            <CardTitle className="text-white text-sm md:text-base">{content.title}</CardTitle>
                            <CardDescription className="text-gray-400 text-xs truncate">{content.genres}</CardDescription>
                            <div className="flex items-center justify-between mt-1">
                                <span className="text-gray-300 text-xs">{content.year}</span>
                                <span className="text-yellow-400 font-semibold text-xs">★ {content.rating}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default CategorySection
