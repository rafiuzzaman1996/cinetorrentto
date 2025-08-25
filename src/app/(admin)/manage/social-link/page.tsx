import { SimpleDataTable } from '@/components/admin/management/data-table/SimpleDataTable'
import React from 'react'
import SocialLinkColumns from './column'
import { getSocialLinks } from '../../admin-api/SocialLinkApi/socialLinkClient'

const AdminSocialLinkPage = async (props: { searchParams: Promise<{ page?: string; pageSize?: string }> }) => {
  const searchParams = await props.searchParams
  const pageIndex = Number(searchParams?.page ?? "1") // page number from URL
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
      <SimpleDataTable
        caption='A list of Social Links.'
        columns={SocialLinkColumns}
        // schema={schema}
        data={data}
        pageSize={pageSize}
        pageIndex={currentPage}
        totalPages={totalPages}
        rowCount={total}
        RowsPerPage={[20, 30, 40, 50]}
      />
    </div>
  )
}

export default AdminSocialLinkPage