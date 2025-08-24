"use client"
import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { Eye, Pencil, Trash, PlusCircle } from "lucide-react"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useId } from "react"
import { submitSocialLink } from "../../admin-api/SocialLinkApi/socialLinkClient"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
// Your schema
export const schema = z.object({
  id: z.number().optional(),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  url: z.string(),
  icon_url: z.string().optional(),
  is_active: z.boolean(),
  sequence: z.number(),
})

export type SocialLink = z.infer<typeof schema>

// 🔹 A reusable dialog component
export function AddEditDialog({
  mode,
  data,
  onSubmit,
}: {
  mode: "add" | "edit" | "view" | "delete"
  data?: SocialLink
  onSubmit?: (values: SocialLink) => void
}) {
  const router = useRouter();
  const formId = useId()
  const [open, setOpen] = useState(false)
  const form = useForm<SocialLink>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: data?.id ?? 0,
      title: data?.title ?? "",
      url: data?.url ?? "",
      icon_url: data?.icon_url ?? "",
      is_active: data?.is_active ?? false,
      sequence: data?.sequence ?? 1,
    },
  })

  // Reset when opening (important for edit/view)
  React.useEffect(() => {
    if (open) {
      form.reset({
        id: data?.id ?? 0,
        title: data?.title ?? "",
        url: data?.url ?? "",
        icon_url: data?.icon_url ?? "",
        is_active: data?.is_active ?? false,
        sequence: data?.sequence ?? 1,
      })
    }
  }, [open, data, form])

  // function handleSubmit(values: SocialLink) {
  //   if (onSubmit) onSubmit(values)
  //   console.log("Submitted:", values)
  // }
  async function handleSubmitForm(values: SocialLink) {
    console.log('🩸🩸 ~ mode:', mode);
    try {
      const data = await submitSocialLink(values, mode)
      console.log("Submitted:", data)
      // show alert
      toast.success(`Social link ${mode === 'add' ? 'Added' : 'Updated'} successfully`)
       setOpen(false)
      onSubmit?.(values)
      router.refresh()

    } catch (err) {
      console.error("Submission failed:", err)
    }
  }
  // --- Handle Delete
  async function handleDelete() {
    if (!data?.id) {
      toast.error("Delete failed: missing ID")
      return
    }
    try {
      await submitSocialLink(data, "delete")
      toast.success("Social link deleted successfully ✅")
      setOpen(false)
      onSubmit?.(data)
      router.refresh()
    } catch (err) {
      toast.error("Failed to delete social link ❌")
      console.error(err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "add" ? (
          <Button variant="outline" size="sm">
            <PlusCircle />
            <span className="hidden lg:inline">Add</span>
          </Button>
        ) : (
          <Button variant="ghost" size="icon">
            {mode === "view" && <Eye color="#c2ffc9" />}
            {mode === "edit" && <Pencil color="#e0c2ff" />}
            {mode === "delete" && <Trash color="#fe959f" />}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="h-[85vh] p-2 flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" && "Add Social Link"}
            {mode === "edit" && "Edit Social Link"}
            {mode === "view" && "View Social Link"}
            {mode === "delete" && "Delete Social Link"}
          </DialogTitle>
          <VisuallyHidden>
            <div>Dialog Description</div>
          </VisuallyHidden>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-1">
          {mode === "view" ? (
            <div className="space-y-2">
              <p><strong>Title:</strong> {data?.title}</p>
              <p><strong>URL:</strong> {data?.url}</p>
              <p><strong>Active:</strong> {data?.is_active ? "Yes" : "No"}</p>
              <p><strong>Sequence:</strong> {data?.sequence}</p>
            </div>
          ) : mode === "delete" ? (
            <div className="space-y-4">
              <p>Are you sure you want to delete <strong>{data?.title}</strong>?</p>
            </div>
          ) : (
            <Form {...form}>
              <form id={formId} onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl><Input placeholder="Enter title" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl><Input placeholder="https://example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="icon_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon URL</FormLabel>
                      <FormControl><Input placeholder="https://cdn.example.com/icon.png" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between border p-3 rounded-lg">
                      <FormLabel>Active</FormLabel>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sequence"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sequence</FormLabel>
                      <FormControl><Input type="number" placeholder="1" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}
        </div>

        <div className="border-t pt-4 flex justify-end gap-2">
          {mode === "delete" ? (
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDelete}>Delete</Button>
            </>
          ) : (
            <>
              {(mode === "add" || mode === "edit") && (
                <>
                  <Button type="button" variant="outline" onClick={() => form.reset()}>Reset</Button>
                  <Button type="submit" form={formId}>{mode === "add" ? "Add" : "Save"}</Button>
                </>
              )}
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">Close</Button>
                </DialogClose>
              </DialogFooter>
            </>
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
  //   id: "actions",
  //   header: "Actions",
  //   cell: () => {
  //     return (
  //       <div className="flex gap-2">
  //         <AddEditDialog2 />
  //       </div>
  //     )
  //   }

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
