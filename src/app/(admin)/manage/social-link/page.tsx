import React from 'react'
import { getSocialLinks } from '../../admin-api/SocialLinkApi/socialLinkClient'
import SocialLinkTable from './SocialLinkTable' // Import the new client component

const AdminSocialLinkPage = async (props: { searchParams: Promise<{ page?: string; pageSize?: string }> }) => {
  const searchParams = await props.searchParams
  const pageIndex = Number(searchParams?.page ?? "1")
  const pageSize = Number(searchParams?.pageSize ?? "20")
  const getSocialLinksData = await getSocialLinks({
    page: pageIndex,
    limit: pageSize,
  });
  const data = getSocialLinksData?.data ?? [];
  const total = getSocialLinksData?.meta?.totalItems ?? 0;
  const totalPages = getSocialLinksData?.meta?.totalPages ?? 1;
  const currentPage = getSocialLinksData?.meta?.currentPage ?? 1;

  return (
    <div className="p-4 pt-0">
      <SocialLinkTable
        data={data}
        total={total}
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
      />
    </div>
  )
}

export default AdminSocialLinkPage