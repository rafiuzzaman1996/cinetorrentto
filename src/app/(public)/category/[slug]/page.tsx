import { getContentsByCategory } from '@/app/api/category-api/categoryApi'
import ContentInfo from '@/components/public/CategorySections/ContentInfo2';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent } from '@radix-ui/react-dialog';
import React from 'react'
import Image from "next/image"

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
const CategoryPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
      const { slug } = await params   // ✅ await params

    const searchParams = {
        slug: slug,
        page: 1,
        limit: 10
    }
    const contents :{data: Content[]} = await getContentsByCategory(searchParams)

  return (
    <div className="my-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 px-4 md:px-8">
                {contents.data.map((content, index) => (
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

export default CategoryPage