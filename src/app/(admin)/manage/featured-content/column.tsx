"use client"
import React from "react"

import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"
import { schema } from "./FeaturedContent.schema"
import { AddEditDialog } from "./AddEditDialog"
import { FeaturedContent } from "@/types/admin/FeaturedContent"

export const FeaturedContentColumns: ColumnDef<FeaturedContent>[] = [
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => {
      const data = row.original as FeaturedContent
      return data?.content?.title || 'N/A'
    }
  },
  {
    accessorKey: "sequence",
    header: "Sequence",
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const data = row.original
      return (
        <div className="flex gap-2">
          <AddEditDialog mode="view" data={data} />
          <AddEditDialog mode="edit" data={data} />
          <AddEditDialog mode="delete" data={data} />
        </div>
      )
    }
  }

]

export default FeaturedContentColumns
