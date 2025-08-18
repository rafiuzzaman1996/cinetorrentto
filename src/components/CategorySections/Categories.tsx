import React from 'react'
import CategorySection from '../CategorySection'

export interface Movie {
    title: string;
    genres: string;
    year: number;
    rating: number;
    img: string;
}

export interface Category {
    id: number;
    title: string;
    contents: Movie[];
}

const categories: Category[] = [
    {
        id: 1,
        title: 'English Movies',
        contents: [
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
    },
    {
        id: 1,
        title: 'Hindi Movies',
        contents: [
            {
                title: "How to Train Your Dragon",
                genres: "Fantasy, Adventure, Family",
                year: 2025,
                rating: 7.7,
                img: "https://lh3.googleusercontent.com/d/1I0tQSQ7_VSWPGwnP9Q-SgwiI7JxALDqB=w500",
            },
        ]
    }
]


const Categories = () => {
  return (
    <>
        {categories.map((category, i) => (
            <CategorySection key={i} category={category}/>
        ))}
    </>
  )
}

export default Categories