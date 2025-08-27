"use client"
import React from "react"

import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"
import { schema, SocialLink } from "@/app/(admin)/manage/social-link/social-link.interface"
import { AddEditDialog } from "@/components/admin/management/data-table/AddEditDialog"
import { submitSocialLink } from "../../admin-api/SocialLinkApi/socialLinkClient"
import { toast } from "sonner"
async function handleSubmitForm(values: SocialLink, mode: "add" | "edit" | "view" | "delete") {
  try {
          console.log('🩸🩸 ~ values:', values);
            const data = await submitSocialLink(values, mode)
            console.log("Submitted222:", data)
            return data

        } catch (err) {
            console.error("Submission failed:", err)
        }
    }

export const SocialLinkColumns: ColumnDef<z.infer<typeof schema>>[] = [
  // {
  //   accessorKey: "id",
  //   header: "ID",
  //   enableHiding: true,
  // },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => (
      <a
        href={row.getValue("url")}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        {row.getValue("url")}
      </a>
    ),
  },
  {
    accessorKey: "icon_url",
    header: "Icon",
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
          <AddEditDialog mode="delete" data={link} onSubmit={handleSubmitForm} />
        </div>
      )
    }
  }

]

export default SocialLinkColumns
