// app/search/page.tsx
import React, { Suspense } from "react";
import { getContentsBySearch } from "../website-api/contentApi";
import { Content } from "@/types/website/Content";
import { ContentCard } from "@/components/website/CategorySection/ContentCard";
import Pagination from "@/components/website/shared/Pagination";
import SkeletonGrid from "@/components/website/shared/SkeletonGrid";
import { Search } from "lucide-react";

const SearchResult = async ({ q, page, genre, year, alphabet, rating }: { q: string; page: number; genre?: string; year?: string; alphabet?: string; rating?: string; }) => {
    const getContentInfo = await getContentsBySearch(q, page, genre, year, alphabet, rating);

    const contents: Content[] = getContentInfo.data || [];
    const pagination = {
        currentPage: getContentInfo.meta.currentPage || 1,
        // pageSize: getContentInfo.meta.pageSize || 20,
        // total: getContentInfo.meta.totalItems || contents.length,
        totalPages: getContentInfo.meta.totalPages || 1,
    };

    return (
        <>
            {/* IF no results */}
            {contents.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[90vh] text-center px-4 md:px-8 space-y-4">
                    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                        <Search size={48} className="text-gray-400 dark:text-gray-500" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                        No results found
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        We couldn’t find any content for <span className="font-medium">&quot;{q}&quot;</span>.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                        Try adjusting your search or check back later.
                    </p>
                    {/* Optional: add a "Clear Search" button */}
                </div>
            ) : (
                <div className="my-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 px-4 md:px-8">
                        {contents.map((data, index) => (
                            <ContentCard key={index} content={data} />
                        ))}
                    </div>
                    <Pagination {...pagination} />
                </div>
            )}
        </>
    );
};

const SearchPage = async ({
    searchParams,
}: {
    searchParams?: Promise<{
        q?: string;
        page?: string;
        genre?: string;
        year?: string;
        alphabet?: string;
        rating?: string;
    }>;
}) => {
    const resolvedSearchParams = await searchParams;
    const q = resolvedSearchParams?.q || "";
    const page = Number(resolvedSearchParams?.page || 1);

    return (
        <Suspense fallback={<SkeletonGrid />}>
            <SearchResult q={q} page={page} genre={resolvedSearchParams?.genre} year={resolvedSearchParams?.year} alphabet={resolvedSearchParams?.alphabet} rating={resolvedSearchParams?.rating} />
        </Suspense>
    );
};

export default SearchPage;
