import React from 'react'
import { Content } from '@/types/website/Content';
import { getContentBySlug } from '../../website-api/contentApi';
import ContentInfo from '@/components/website/CategorySection/ContentInfo';
import Link from 'next/link';

const ContentPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const content: Content = await getContentBySlug(slug)

    return (
        <div className="my-8">
            {/* Add a Back Button to the previous page and location */}
            {/* <div className="mb-4 px-4 md:px-8">
                <Link href="/" className="text-orange-500 hover:text-orange-600">&larr; Back to Home</Link>
            </div> */}
            <div className="mb-4 px-4 md:px-8">

            </div>
            {/* Content Info Section */}
            <div className="flex justify-center">
                <ContentInfo content={content} />
            </div>
        </div>
    )
}

export default ContentPage