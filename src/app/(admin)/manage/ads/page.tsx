import { SimpleDataTable } from '@/components/admin/management/data-table/SimpleDataTable'
import React from 'react'
import AdsColumns from './column'
import { AddEditDialog } from './AddEditDialog'
import { DataTableSkeleton } from '@/components/admin/management/data-table/data-table-skeleton'
import { FilterSearch } from './FilterSearch'
import { getAds } from '../../admin-api/AdsApi'

const AdminAdsListPage = async (props: { searchParams: Promise<{ page?: string; pageSize?: string, search?: string }> }) => {
  const searchParams = await props.searchParams
  const pageIndex = Number(searchParams?.page ?? "1") // page number from URL
  const pageSize = Number(searchParams?.pageSize ?? "20")

  const getAdsData = await getAds({
    page: pageIndex,
    limit: pageSize,
    // search: searchParams?.search
    // ? { title: searchParams.search, url: searchParams.search, icon_url: searchParams.search }  // only send filter if search is present
    // : undefined
    search: searchParams?.search ?? ''
  });
  const data = getAdsData?.data ?? [];
  const total = getAdsData?.meta?.totalItems ?? 0;
  const totalPages = getAdsData?.meta?.totalPages ?? 1;
  const currentPage = getAdsData?.meta?.currentPage ?? 1;
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
          caption='A list of Ads.'
          columns={AdsColumns}
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

export default AdminAdsListPage