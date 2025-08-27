"use client"
import React, { useState, useId } from "react"
import { toast } from "sonner"
import { useForm, FieldValues } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash, PlusCircle } from "lucide-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { zodResolver } from "@hookform/resolvers/zod"
import { DynamicForm, FieldConfig } from "./DynamicForm"
import z, { ZodType } from "zod"
import type { ZodTypeAny } from "zod"
import { SocialLink, schema } from "@/app/(admin)/manage/social-link/social-link.interface"

// Define a base interface that all data should have
export interface BaseData {
  id?: number | string;
  [key: string]: unknown;
}
export function AddEditDialog<
    TSchema extends ZodTypeAny
>({
    mode,
    data,
    fields,
    schema,
    onSubmit,
}: {
    mode: "add" | "edit" | "view" | "delete"
    data?: z.infer<TSchema>
    fields: FieldConfig<TSchema>[]
    schema: TSchema
    onSubmit?: (values: z.infer<TSchema>, mode: "add" | "edit" | "view" | "delete") => void
}) {
    const router = useRouter();
    const formId = useId()
    const [open, setOpen] = useState(false)

    // Infer the type from the schema
    type FormValues = z.infer<typeof schema>

    const form = useForm<FormValues & FieldValues>({
        resolver: zodResolver(schema),
        defaultValues: (data as FormValues) || ({} as FormValues),
    })
    // Reset when opening (important for edit/view)
    React.useEffect(() => {
        if (open && data) {
            form.reset(data as FormValues)
        }
    }, [open, data, form])

    async function handleSubmitForm(values: TData) {
        try {
            // const data = await submitSocialLink(values, mode)
            await onSubmit?.(values, mode)
            console.log("Submitted111:", values)
            // show alert
            toast.success(`Social link ${mode === 'add' ? 'Added' : 'Updated'} successfully`)
            setOpen(false)
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
            // await submitSocialLink(data, "delete")
            await onSubmit?.(data, mode)
            toast.success("Social link deleted successfully ✅")
            setOpen(false)
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
                            <p><strong>Title:</strong> {String(data?.title ?? "")}</p>
                            <p><strong>URL:</strong> {String(data?.url ?? "")}</p>
                            <p><strong>Active:</strong> {String(data?.is_active ? "Yes" : "No")}</p>
                            <p><strong>Sequence:</strong> {String(data?.sequence ?? "")}</p>
                        </div>
                    ) : mode === "delete" ? (
                        <div className="space-y-4">
                            <p>Are you sure you want to delete <strong>{String(data?.title ?? "")}</strong>?</p>
                        </div>
                    ) : (
                        // <Form {...form}>
                        //     <form id={formId} onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-4">
                        //         <FormField
                        //             control={form.control}
                        //             name="title"
                        //             render={({ field }) => (
                        //                 <FormItem>
                        //                     <FormLabel>Title</FormLabel>
                        //                     <FormControl><Input placeholder="Enter title" {...field} /></FormControl>
                        //                     <FormMessage />
                        //                 </FormItem>
                        //             )}
                        //         />
                        //         <FormField
                        //             control={form.control}
                        //             name="url"
                        //             render={({ field }) => (
                        //                 <FormItem>
                        //                     <FormLabel>URL</FormLabel>
                        //                     <FormControl><Input placeholder="https://example.com" {...field} /></FormControl>
                        //                     <FormMessage />
                        //                 </FormItem>
                        //             )}
                        //         />
                        //         <FormField
                        //             control={form.control}
                        //             name="icon_url"
                        //             render={({ field }) => (
                        //                 <FormItem>
                        //                     <FormLabel>Icon URL</FormLabel>
                        //                     <FormControl><Input placeholder="https://cdn.example.com/icon.png" {...field} /></FormControl>
                        //                     <FormMessage />
                        //                 </FormItem>
                        //             )}
                        //         />
                        //         <FormField
                        //             control={form.control}
                        //             name="is_active"
                        //             render={({ field }) => (
                        //                 <FormItem className="flex items-center justify-between border p-3 rounded-lg">
                        //                     <FormLabel>Active</FormLabel>
                        //                     <FormControl>
                        //                         <Switch checked={field.value} onCheckedChange={field.onChange} />
                        //                     </FormControl>
                        //                 </FormItem>
                        //             )}
                        //         />
                        //         <FormField
                        //             control={form.control}
                        //             name="sequence"
                        //             render={({ field }) => (
                        //                 <FormItem>
                        //                     <FormLabel>Sequence</FormLabel>
                        //                     <FormControl><Input type="number" placeholder="1" {...field} /></FormControl>
                        //                     <FormMessage />
                        //                 </FormItem>
                        //             )}
                        //         />
                        //     </form>
                        // </Form>
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
