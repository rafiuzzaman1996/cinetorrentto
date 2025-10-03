import React from 'react'
import { getContentsByCategory } from '@/app/(website)/website-api/categoryApi'
import { ContentCard } from '@/components/website/CategorySection/Content';
import { Content } from '@/types/website/Content';
import Pagination from '@/components/website/shared/Pagination';

const CategoryPage = async ({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ page?: string }> }) => {
    const { slug } = await params   // ✅ await params
    const { page } = await searchParams;

    const queryParams = {
        slug: slug,
        page: page ? Number(page) : 1,
    }
    const getContentInfo = await getContentsByCategory(queryParams)
    const contents: Content[] = getContentInfo.data || [];
    const pagination = {
        currentPage: getContentInfo.meta.currentPage || 1,
        // pageSize: getContentInfo.meta.pageSize || 20,
        // total: getContentInfo.meta.totalItems || contents.length,
        totalPages: getContentInfo.meta.totalPages || 1,
    };

    return (
        <div className="my-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 px-4 md:px-8">
                {contents.map((data, index) => (
                    <ContentCard key={index} content={data} />
                ))}
            </div>
            <Pagination {...pagination} />
        </div>
    )
}

export default CategoryPage