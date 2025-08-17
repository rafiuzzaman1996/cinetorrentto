import React from "react"
import Image from "next/image"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"

const movies = [
    {
        title: "How to Train Your Dragon",
        genres: "Fantasy, Adventure, Family",
        year: 2025,
        rating: 7.7,
        img: "https://lh3.googleusercontent.com/d/1I0tQSQ7_VSWPGwnP9Q-SgwiI7JxALDqB=w500",
    },
    {
        title: "Cleaner",
        genres: "Action, Thriller, Drama",
        year: 2025,
        rating: 5.1,
        img: "https://lh3.googleusercontent.com/d/1MCvWHvomvU8EGK_JPPyfiTseXXN9OCss=w500",
    },
    {
        title: "The Gorge",
        genres: "Thriller, Action, Romance",
        year: 2025,
        rating: 6.7,
        img: "https://lh3.googleusercontent.com/d/1iWSAaIfD9b898cdddgUQ3GmY9Uf1JqJ1=w500",
    },
    {
        title: "Valiant One",
        genres: "War, Action, Thriller",
        year: 2025,
        rating: 5.1,
        img: "https://lh3.googleusercontent.com/d/1TW5iNTEaOSU1c-bf2Zol9pZoDn5vDJ9x=w500",
    },
    {
        title: "Marked Men",
        genres: "Romance, Drama",
        year: 2025,
        rating: 5.2,
        img: "https://lh3.googleusercontent.com/d/1WBAKHbyQ2XPgnxBDQvsDmielbgU47oxS=w500",
    },
    {
        title: "Kingdom of the Planet of the Apes",
        genres: "Sci-Fi, Adventure, Action",
        year: 2024,
        rating: 7.2,
        img: "https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    },
    {
        title: "Godzilla x Kong",
        genres: "Action, Sci-Fi, Adventure",
        year: 2024,
        rating: 7.2,
        img: "/images/godzilla-kong.jpg",
    },
    {
        title: "The Dark Knight",
        genres: "Action, Crime, Drama",
        year: 2008,
        rating: 8.5,
        img: "https://lh3.googleusercontent.com/d/1TW5iNTEaOSU1c-bf2Zol9pZoDn5vDJ9x=w500",
    },
]

const CategorySection = () => {
    return (
        <div className="my-8">
            <div className="flex items-center justify-between mb-4 px-4 md:px-8">
                <h2 className="text-xl font-bold text-orange-500">English Movies</h2>
                <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                    SEE ALL
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 px-4 md:px-8">
                {movies.slice(0, 6).map((movie, index) => (
                    <Card key={index} className="bg-gray-800 p-0 gap-2 dark:bg-gray-900 overflow-hidden border-0">
                        <Image
                            src={movie.img}
                            alt={movie.title}
                            width={500}
                            height={500}  // increased height
                            className="h-100 object-cover" // taller image
                        />
                        <CardContent className="p-2">
                            <CardTitle className="text-white text-sm md:text-base">{movie.title}</CardTitle>
                            <CardDescription className="text-gray-400 text-xs truncate">{movie.genres}</CardDescription>
                            <div className="flex items-center justify-between mt-1">
                                <span className="text-gray-300 text-xs">{movie.year}</span>
                                <span className="text-yellow-400 font-semibold text-xs">★ {movie.rating}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default CategorySection
