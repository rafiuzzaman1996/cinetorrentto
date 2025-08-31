"use client"
import React from "react"

import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"
import { schema } from "./content.interface"
import { AddEditDialog } from "./AddEditDialog"
import EditDialogWrapper from "./EditDialogWrapper"

export const SocialLinkColumns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "type",
    header: "Type",
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
          <a href={`/manage/content/${row.original.id}`}>
            Edit
          </a>
          {/* {typeof link.id === "number" ? <EditDialogWrapper id={link.id} /> : null} */}
          {/* <AddEditDialog mode="edit" data={link} /> */}
          <AddEditDialog mode="delete" data={link} />
        </div>
      )
    }
  }

]

export default SocialLinkColumns
