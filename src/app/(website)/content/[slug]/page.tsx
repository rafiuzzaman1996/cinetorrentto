import React from 'react'
import { Content } from '@/types/website/Content';
import { getContentBySlug } from '../../website-api/contentApi';
import ContentInfo from '@/components/website/CategorySection/ContentInfo';
export const dynamic = "force-dynamic";

const ContentPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const content: Content = await getContentBySlug(slug)

    return (
        <div className="my-8">
            {/* Content Info Section */}
            <div className="flex justify-center">
                <ContentInfo content={content} />
            </div>
        </div>
    )
}

export default ContentPage