'use client';

import { Category } from "@/types/website/Category"
import { useRouter } from "next/navigation"
import { ContentCard } from "./ContentCard";
import Link from "next/link";

export const CategorySection = ({ category }: { category: Category }) => {
    const router = useRouter()
    const handleClick = (slug: string) => {
        router.push(`/category/${slug}`)
    }
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4 px-4 md:px-8">
                <Link
                    href={`/category/${category.slug}`}
                    className="cursor-pointer"
                >
                    <h2 className="text-xl font-bold text-orange-500 hover:text-orange-600">{category.title}</h2>
                </Link>
                <button onClick={() => handleClick(category.slug)} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer">
                    SEE ALL
                </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 px-4 md:px-8">
                {category.contents.slice(0, 6).map((content, index) => (
                    <ContentCard key={index} content={content} />
                ))}
            </div>

        </div>
    )
}
