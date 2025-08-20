import { SimpleDataTable } from '@/components/admin/management/data-table/SimpleDataTable'
import React from 'react'
import SocialLinkColumns from './column'
import { getSocialLinks } from '../../admin-api/SocialLinkApi/route'

const AdminSocialLinkPage = async (props: { searchParams: Promise<{ page?: string; pageSize?: string }> }) => {
  const searchParams = await props.searchParams
  const pageIndex = Number(searchParams?.page ?? "1") // page number from URL
  const pageSize = Number(searchParams?.pageSize ?? "1")
  const searchParams2 = {
    page: pageIndex,
    limit: pageSize,
  }
  const getSocialLinksData = await getSocialLinks(searchParams2);
  const data = getSocialLinksData.data
  const total = getSocialLinksData.meta.totalItems
  const totalPages = getSocialLinksData.meta.totalPages
  const currentPage = getSocialLinksData.meta.currentPage
  return (
    <div className="p-4 pt-0">
      <SimpleDataTable
        caption='A list of Social Links.'
        columns={SocialLinkColumns}
        data={data}
        pageSize={pageSize}
        pageIndex={currentPage}
        totalPages={totalPages}
        rowCount={total}
        RowsPerPage={[1,2,10, 20, 30, 40, 50]}
      />
    </div>
  )
}

export default AdminSocialLinkPage