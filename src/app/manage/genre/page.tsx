import { DataTable } from '@/components/management/data-table/data-table2'
import React from 'react'
import data from "./data.json"

const AdminGenrePage = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <DataTable data={data} />
    </div>
  )
}

export default AdminGenrePage