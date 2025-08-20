"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ColumnDef } from "@tanstack/react-table"
import { Eye, Pencil, Trash, Plus } from "lucide-react"
import { z } from "zod"

// Your schema
export const schema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string(),
  icon_url: z.string().optional(),
  is_active: z.boolean(),
  sequence: z.number(),
})

type SocialLink = z.infer<typeof schema>

// 🔹 A reusable dialog component
function AddEditDialog({
  mode,
  data,
}: {
  mode: "add" | "edit" | "view" | "delete"
  data?: SocialLink
}) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {mode === "view" && (
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Eye color="#c2ffc9" />
          </Button>
        )}
        {mode === "edit" && (
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Pencil color="#e0c2ff" />
          </Button>
        )}
        {mode === "delete" && (
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Trash color="#fe959f" />
          </Button>
        )}
        {mode === "add" && (
          <Button variant="default" size="sm">
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "add" && "Add Social Link"}
            {mode === "edit" && "Edit Social Link"}
            {mode === "view" && "View Social Link"}
            {mode === "delete" && "Delete Social Link"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {mode === "view" ? (
            <div className="space-y-2">
              <p><strong>Title:</strong> {data?.title}</p>
              <p><strong>URL:</strong> {data?.url}</p>
              <p><strong>Active:</strong> {data?.is_active ? "Yes" : "No"}</p>
              <p><strong>Sequence:</strong> {data?.sequence}</p>
            </div>
          ) : mode === "delete" ? (
            <p>Are you sure you want to delete <strong>{data?.title}</strong>?</p>
          ) : (
            // Add/Edit form here
            <form className="space-y-3">
              <input type="text" placeholder="Title" defaultValue={data?.title} className="w-full border rounded p-2" />
              <input type="text" placeholder="URL" defaultValue={data?.url} className="w-full border rounded p-2" />
              <input type="number" placeholder="Sequence" defaultValue={data?.sequence} className="w-full border rounded p-2" />
              <div className="flex gap-2">
                <Button type="submit">{mode === "add" ? "Add" : "Save"}</Button>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
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
  // {
  //       id: "actions",
  //       header: "",
  //       cell: () => (
  //           <div className="flex gap-2">
  //               <Button variant="ghost" size="icon" className="data-[state=open]:bg-muted text-muted-foreground flex size-8">
  //                   <Eye color="#c2ffc9"/>
  //               </Button>
  //               <Button variant="ghost" size="icon" className="data-[state=open]:bg-muted text-muted-foreground flex size-8">
  //                   <Pencil color="#e0c2ff"/>
  //               </Button>
  //               <Button variant="ghost" size="icon" className="data-[state=open]:bg-muted text-muted-foreground flex size-8">
  //                   <Trash color="#fe959f"/>
  //               </Button>
  //           </div>
  //       ),
  // },
  // {
  //   id: "actions",
  //   header: "",
  //   cell: ({ row }) => {
  //     const data = row.original // row data to pass to dialog

  //     return (
  //       <div className="flex gap-2">
  //         {/* View Button with Dialog */}
  //         <AddEditDialog initialData={data} trigger={
  //           <Button
  //             variant="ghost"
  //             size="icon"
  //             className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
  //           >
  //             <Eye color="#c2ffc9" />
  //           </Button>
  //         } />

  //         {/* Edit Button */}
  //         <AddEditDialog initialData={data} trigger={
  //           <Button
  //             variant="ghost"
  //             size="icon"
  //             className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
  //           >
  //             <Pencil color="#e0c2ff" />
  //           </Button>
  //         } />

  //         {/* Delete Button (no dialog) */}
  //         <Button
  //           variant="ghost"
  //           size="icon"
  //           className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
  //           onClick={() => console.log("Delete", data.id)}
  //         >
  //           <Trash color="#fe959f" />
  //         </Button>
  //       </div>
  //     )
  //   },
  // }
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

export default SocialLinkColumns
