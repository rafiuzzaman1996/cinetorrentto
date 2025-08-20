"use client";

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { Eye, Pencil, Trash } from "lucide-react"
import { z } from "zod"

export const schema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string(),
  icon_url: z.string().optional(),
  is_active: z.boolean(),
  sequence: z.number(),
  // created_at: z.date(),
  // updated_at: z.date(),
})

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
    // cell: ({ row }) => (
    //   <img
    //     src={row.getValue("icon_url")}
    //     alt="icon"
    //     className="h-6 w-6 object-contain"
    //   />
    // ),
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
  // {
  //   accessorKey: "created_at",
  //   header: "Created At",
  //   cell: ({ row }) =>
  //     new Date(row.getValue("created_at")).toLocaleDateString(),
  // },
  // {
  //   accessorKey: "updated_at",
  //   header: "Updated At",
  //   cell: ({ row }) =>
  //     new Date(row.getValue("updated_at")).toLocaleDateString(),
  // },
  {
        id: "actions",
        header: "",
        cell: () => (
            <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="data-[state=open]:bg-muted text-muted-foreground flex size-8">
                    <Eye color="#c2ffc9"/>
                </Button>
                <Button variant="ghost" size="icon" className="data-[state=open]:bg-muted text-muted-foreground flex size-8">
                    <Pencil color="#e0c2ff"/>
                </Button>
                <Button variant="ghost" size="icon" className="data-[state=open]:bg-muted text-muted-foreground flex size-8">
                    <Trash color="#fe959f"/>
                </Button>
            </div>
        ),
    },
]

export default SocialLinkColumns
