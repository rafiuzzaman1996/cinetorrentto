import React from "react"
import Image from "next/image"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Category } from "./CategorySections/Categories"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import ContentInfo from "./CategorySections/ContentInfo2"
interface FeaturedCarouselProps {
    category: Category;
}
const CategorySection: React.FC<FeaturedCarouselProps> = ({ category }) => {
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
                    <Dialog key={index}>
                        <DialogTrigger asChild>
                            <Card key={index} className="bg-gray-800 p-0 gap-2 dark:bg-gray-900 overflow-hidden border-0 duration-500 hover:scale-105">
                                <Image
                                    src={content.poster_image_url}
                                    alt={content.title}
                                    width={500}
                                    height={500}  // increased height
                                    className="h-100 object-cover object-center transition-transform"
                                />
                                <CardContent className="p-2">
                                    <CardTitle className="text-white text-sm md:text-base truncate" title={content.title}>{content.title}</CardTitle>
                                    <CardDescription className="text-gray-400 text-xs truncate">{content.genres.map(data => data.title).join(', ')}</CardDescription>
                                    <div className="flex items-center justify-between mt-1">
                                        <span className="text-gray-300 text-xs">{new Date(content.release_date).getFullYear()}</span>
                                        <span className="text-yellow-400 font-semibold text-xs">★ {content.rating}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl rounded-2xl">
                            {/* <ContentInfo content={content} /> */}
                            <ContentInfo />
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </div>
    )
}

export default CategorySection
