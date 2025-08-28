"use client"
import React from "react"

import { useState, useId } from "react"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash, PlusCircle } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { submitSocialLink } from "@/app/(admin)/admin-api/SocialLinkApi/socialLinkClient"
import { schema, SocialLink } from "@/app/(admin)/manage/social-link/social-link.interface"
import { DynamicForm, FieldConfig } from "../../../../components/admin/management/data-table/DynamicForm"

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
    required: true
  },
  {
    key: "is_active",
    label: "Active",
    inputType: "switch" as const,
    placeholder: ""
  },
  { key: "sequence", label: "Sequence", inputType: "number" as const, placeholder: "1" },
];

export const AddEditDialog = ({
    mode,
    data,
    onSubmit,
}: {
    mode: "add" | "edit" | "view" | "delete"
    data?: SocialLink
    onSubmit?: (values: SocialLink) => void
}) => {
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

    async function handleSubmitForm(values: SocialLink) {
        try {
            await submitSocialLink(values, mode)
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

            <DialogContent className="sm:max-w-6/12 w-full h-[80vh] p-2 flex flex-col">
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
                        <div className="">
                        <DynamicForm<typeof schema>
                            form={form}
                            formId={formId}
                            fields={fields}
                            onSubmit={handleSubmitForm}
                        />
                        </div>
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
