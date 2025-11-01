import React from 'react'
import { getAttachments } from '../../admin-api/AttachmentApi';
import Images from './Images';

const GalleryPage = async (props: { searchParams: Promise<{ page?: string; pageSize?: string, search?: string }> }) => {
const searchParams = await props.searchParams
  const pageIndex = Number(searchParams?.page ?? "1") // page number from URL
  const pageSize = Number(searchParams?.pageSize ?? "20")

  const getSocialLinksData = await getAttachments({
    page: pageIndex,
    limit: pageSize,
    // search: searchParams?.search
    // ? { title: searchParams.search, url: searchParams.search, icon_url: searchParams.search }  // only send filter if search is present
    // : undefined
    search: searchParams?.search ?? ''
  });
  console.log('🩸🩸 ~ getSocialLinksData:', getSocialLinksData);
  const data = getSocialLinksData?.data ?? [];
  const total = getSocialLinksData?.meta?.totalItems ?? 0;
  const totalPages = getSocialLinksData?.meta?.totalPages ?? 1;
  const currentPage = getSocialLinksData?.meta?.currentPage ?? 1;
  return (
    <div className="p-4 pt-0">
      <React.Suspense
        fallback={
          <div>Loading Gallery...</div>
        }
      >
        <div>
          <Images data={data} total={total} totalPages={totalPages} currentPage={currentPage} />
        </div>
      </React.Suspense>
    </div>
  )
}

export default GalleryPage