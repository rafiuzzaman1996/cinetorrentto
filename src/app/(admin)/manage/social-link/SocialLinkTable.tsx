// components/SocialLinkTable.tsx
"use client"
import { useRouter } from "next/navigation"
import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"
import { schema, SocialLink } from "@/app/(admin)/manage/social-link/social-link.interface"
import { AddEditDialog } from "@/components/admin/management/data-table/AddEditDialog"
import { submitSocialLink } from "../../admin-api/SocialLinkApi/socialLinkClient"
import { toast } from "sonner"
import { SimpleDataTable } from '@/components/admin/management/data-table/SimpleDataTable'
import { FieldConfig } from "@/components/admin/management/data-table/DynamicForm"


const fields: FieldConfig<typeof schema>[] = [
  {
    key: "title",
    label: "Title",
    inputType: "text" as const,
    placeholder: "Enter title",
    required: true
  },
  {
    key: "url",
    label: "URL",
    inputType: "text" as const,
    placeholder: "Enter URL",
    required: true
  },
  {
    key: "icon_url",
    label: "Icon URL",
    inputType: "text" as const,
    placeholder: "Enter icon URL",
    required: false
  },
  {
    key: "is_active",
    label: "Active",
    inputType: "switch" as const,
    placeholder: ""
  },
  { key: "sequence", label: "Sequence", inputType: "number" as const, placeholder: "1" },
];
export default function SocialLinkTable({
  data,
  total,
  currentPage,
  totalPages,
  pageSize,
}: {
  data: SocialLink[]
  total: number
  currentPage: number
  totalPages: number
  pageSize: number
}) {
  const router = useRouter()

  async function handleSubmitForm(values: SocialLink, mode: "add" | "edit" | "view" | "delete") {
    console.log('🩸🩸 ~ qqqqqqqqqqqqvalues:', values);
    try {
      await submitSocialLink(values, mode)
      toast.success(
        mode === "add" ? "Added successfully" :
        mode === "edit" ? "Updated successfully" :
        "Deleted successfully"
      )
      router.refresh()
    } catch (err: unknown) {
      toast.error(`Operation failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const SocialLinkColumns: ColumnDef<z.infer<typeof schema>>[] = [
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
            <AddEditDialog mode="view" data={link} fields={fields} schema={schema} onSubmit={handleSubmitForm} />
            <AddEditDialog mode="edit" data={link} fields={fields} schema={schema} onSubmit={handleSubmitForm} />
            <AddEditDialog mode="delete" data={link} fields={fields} schema={schema} onSubmit={handleSubmitForm} />
          </div>
        )
      }
    }
  ]

  return (
    <SimpleDataTable
      caption='A list of Social Links.'
      columns={SocialLinkColumns}
      data={data}
      pageSize={pageSize}
      pageIndex={currentPage}
      totalPages={totalPages}
      rowCount={total}
      RowsPerPage={[20, 30, 40, 50]}
      fields={fields}
      schema={schema}
      onSubmit={handleSubmitForm}
    />
  )
}