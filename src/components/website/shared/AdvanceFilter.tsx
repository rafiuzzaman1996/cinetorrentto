"use client"

import { useEffect, useState } from "react"
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MultiSelect } from "@/components/ui/multi-select"
import { Genre } from "@/types/website/Genre"
import { getGenres } from "@/app/(website)/website-api/GenreApi"
import { useRouter } from "next/navigation";
import FilterAd from "../Ad/FilterAd";
import { Ads } from "@/types/admin/Ads"

export const AdvanceFilter = ({filterAds}: {filterAds: Ads[]}) => {
    const router = useRouter();
    const [open, setOpen] = useState(false)
    const [genres, setGenres] = useState<Genre[]>([])
    const [filters, setFilters] = useState<{
        genre: string[];
        year: string[];
        alphabet: string[];
        rating: string[];
    }>({
        genre: [],
        year: [],
        alphabet: [],
        rating: [],
    })

    // Generate year options from 1995 to current year and show in descending order
    const yearOptions = Array.from(
        { length: new Date().getFullYear() - 1995 + 1 },
        (_, i) => (1995 + i).toString()
    ).reverse();

    // Alphabet options A-Z
    const alphabetOptions = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

    // rating options from 9 to 5
    const ratingOptions = Array.from({ length: 5 }, (_, i) => (9 - i).toString());

    // Get genres from API
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const getData = await getGenres()
                setGenres(getData.data || [])
            } catch (error) {
                console.error("Error fetching genres:", error)
            }
        }
        fetchGenres()
    }, [])

    // set filter from query params on initial load
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const genre = params.get("genre")?.split(",") || []
        const year = params.get("year")?.split(",") || []
        const alphabet = params.get("alphabet")?.split(",") || []
        const rating = params.get("rating")?.split(",") || []
        setFilters({
            genre,
            year,
            alphabet,
            rating,
        })
    }, [])

    const handleFilter = () => {
        const queryParams = new URLSearchParams()
        if (filters.genre.length) queryParams.append("genre", filters.genre.join(","))
        if (filters.year.length) queryParams.append("year", filters.year.join(","))
        if (filters.alphabet.length) queryParams.append("alphabet", filters.alphabet.join(","))
        if (filters.rating.length) queryParams.append("rating", filters.rating.join(","))

        const queryString = queryParams.toString()
        const url = queryString ? `/search?${queryString}` : "/"
        router.push(url)
    }

    return (
        <div>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="cursor-pointer" title="Filter">
                        <Filter className="h-5 w-5" />
                    </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
                    <SheetTitle className="mb-4 text-lg font-semibold">Filter</SheetTitle>
                    <div className="overflow-y-auto space-y-4">
                        {/* Filter By Genre */}
                        <MultiSelect
                            modalPopover={true}
                            options={genres.map((genre) => ({
                                value: genre.slug,
                                label: genre.title,
                            }))}
                            value={filters.genre}
                            defaultValue={filters.genre}
                            placeholder="Browse By Genre"
                            onValueChange={(value) => setFilters({ ...filters, genre: value })}
                        />
                        {/* Filter By Year */}
                        <MultiSelect
                            modalPopover={true}
                            options={yearOptions.map((year) => ({
                                value: year,
                                label: year,
                            }))}
                            value={filters.year}
                            defaultValue={filters.year}
                            placeholder="Browse By Year"
                            onValueChange={(value) => setFilters({ ...filters, year: value })}
                        />
                        {/* Filter By Alphabet */}
                        <MultiSelect
                            modalPopover={true}
                            options={alphabetOptions.map((char) => ({
                                value: char,
                                label: char,
                            }))}
                            value={filters.alphabet}
                            defaultValue={filters.alphabet}
                            placeholder="Browse By Alphabet"
                            onValueChange={(value) => setFilters({ ...filters, alphabet: value })}
                        />
                        {/* Filter By Rating */}
                        <MultiSelect
                            modalPopover={true}
                            options={ratingOptions.map((rating) => ({
                                value: rating,
                                label: `★ ${rating}+`,
                            }))}
                            value={filters.rating}
                            defaultValue={filters.rating}
                            placeholder="Browse By Rating"
                            onValueChange={(value) => setFilters({ ...filters, rating: value })}
                        />

                        {/* Ads Area */}
                        <div className="mt-4    ">
                            <FilterAd ads={filterAds} />
                        </div>
                    </div>
                    <SheetFooter>
                        <div className="flex gap-2">

                            <Button
                                variant="secondary"
                                className="w-1/2 cursor-pointer"
                                onClick={() => {
                                    setFilters({
                                        genre: [],
                                        year: [],
                                        alphabet: [],
                                        rating: [],
                                    })
                                    // remove query params
                                    router.push("/")
                                    setOpen(false)
                                }}
                            >
                                Clear Filters
                            </Button>
                            <Button
                                className="w-1/2 cursor-pointer"
                                onClick={() => {
                                    setOpen(false)
                                    handleFilter()
                                }}
                            >
                                Apply Filters
                            </Button>
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}
