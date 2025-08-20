import { SimpleDataTable } from '@/components/admin/management/data-table/SimpleDataTable'
import React from 'react'
import SocialLinkColumns from './column'
import { getSocialLinks } from '../../admin-api/SocialLinkApi/route'

// const data = [
//     {
//       "id": 1,
//       "title": "Facebook",
//       "url": "https://www.facebook.com/cinetorrentto",
//       "icon_url": 'null',
//       "is_active": true,
//       "sequence": 0
//     },
//     {
//       "id": 3,
//       "title": "Telegram",
//       "url": "https://t.me/cinetorrentto",
//       "icon_url": 'null',
//       "is_active": true,
//       "sequence": 0
//     }
//   ]


const AdminSocialLinkPage = async (props: { searchParams: Promise<{ page?: string; pageSize?: string }> }) => {
  const searchParams = await props.searchParams
  console.log('🩸🩸 ~ searchParams:', searchParams);
  const pageIndex = Number(searchParams?.page ?? "1") // page number from URL
  const pageSize = Number(searchParams?.pageSize ?? "1")
  const searchParams2 = {
    page: pageIndex,
    limit: pageSize,
  }
  const getSocialLinksData = await getSocialLinks(searchParams2);
  console.log('🩸🩸 ~ getSocialLinksData:', getSocialLinksData.meta);
  const data = getSocialLinksData.data
  const total = getSocialLinksData.meta.totalItems
  const itemsPerPage = getSocialLinksData.meta.itemsPerPage
  const currentPage = getSocialLinksData.meta.currentPage
  return (
    <div className="p-4 pt-0">
      <SimpleDataTable
        caption='A list of Social Links.'
        columns={SocialLinkColumns}
        data={data}
        pageSize={pageSize}
        pageIndex={currentPage}
        // pageSize={itemsPerPage}
        rowCount={total}
      />
    </div>
  )
}

export default AdminSocialLinkPage