import React from 'react'
import { columns, Payment } from "@/components/management/data-table/column"
import { DataTable } from "@/components/management/data-table/data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}
const AdminCategoryPage = async () => {
  const data = await getData()
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="container mx-auto py-10">
      <DataTable tableName={"Category"} columns={columns} data={data} />
    </div>
    </div>
  )
}

export default AdminCategoryPage