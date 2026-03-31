import { SimpleDataTable } from '@/components/admin/management/data-table/SimpleDataTable'
import React from 'react'
import SocialLinkColumns from './column'
import { getSocialLinks } from '../../admin-api/SocialLinkApi/socialLinkClient'
import { AddEditDialog } from './AddEditDialog'
import { DataTableSkeleton } from '@/components/admin/management/data-table/data-table-skeleton'
import { FilterSearch } from './FilterSearch'

const AdminSocialLinkPage = async (props: { searchParams: Promise<{ page?: string; pageSize?: string, search?: string }> }) => {
  const searchParams = await props.searchParams
  const pageIndex = Number(searchParams?.page ?? "1") // page number from URL
  const pageSize = Number(searchParams?.pageSize ?? "20")

  const getSocialLinksData = await getSocialLinks({
    page: pageIndex,
    limit: pageSize,
    // search: searchParams?.search
    // ? { title: searchParams.search, url: searchParams.search, icon_url: searchParams.search }  // only send filter if search is present
    // : undefined
    search: searchParams?.search ?? ''
  });
  const data = getSocialLinksData?.data ?? [];
  const total = getSocialLinksData?.meta?.totalItems ?? 0;
  const totalPages = getSocialLinksData?.meta?.totalPages ?? 1;
  const currentPage = getSocialLinksData?.meta?.currentPage ?? 1;
  return (
    <div className="p-4 pt-0">
      <React.Suspense
        fallback={
          <DataTableSkeleton
            columnCount={7}
            filterCount={2}
            cellWidths={[
              "10rem",
              "30rem",
              "10rem",
              "10rem",
              "6rem",
              "6rem",
              "6rem",
            ]}
            shrinkZero
          />
        }
      >
        <SimpleDataTable
          caption='A list of Social Links.'
          columns={SocialLinkColumns}
          // schema={schema}
          filterSearch={<FilterSearch />}
          addDialog={<AddEditDialog mode="add" />}
          data={data}
          pageSize={pageSize}
          pageIndex={currentPage}
          totalPages={totalPages}
          rowCount={total}
          RowsPerPage={[20, 30, 40, 50]}
        />
      </React.Suspense>
    </div>
  )
}

export default AdminSocialLinkPage