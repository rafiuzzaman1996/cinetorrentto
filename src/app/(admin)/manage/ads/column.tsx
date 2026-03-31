"use client"
import React from "react"

import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"
import { schema } from "./ads.schema"
import { AddEditDialog } from "./AddEditDialog"

export const AdsColumns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "placement",
    header: "Placement",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "format",
    header: "Format",
  },
  {
    accessorKey: "is_active",
    header: "Active",
    cell: ({ row }) =>
      row.getValue("is_active") ? (

        <span className="text-green-600 font-medium">Yes</span>
      ) : (
        <span className="text-red-600 font-medium">No</span>
      ),
  },
  {
    accessorKey: "sequence",
    header: "Sequence",
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const link = row.original
      return (
        <div className="flex gap-2">
          <AddEditDialog mode="view" data={link} />
          <AddEditDialog mode="edit" data={link} />
          <AddEditDialog mode="delete" data={link} />
        </div>
      )
    }
  }

]

export default AdsColumns
