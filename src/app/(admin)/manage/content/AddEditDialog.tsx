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

import { schema, Content } from "@/app/(admin)/manage/content/content.interface"
import { DynamicForm, FieldConfig } from "../../../../components/admin/management/data-table/DynamicForm"

const fields: FieldConfig<typeof schema>[] = [

    {
        key: "title",
        label: "Title",
        inputType: "text",
        placeholder: "Enter content title",
        required: true,
    },
    {
        key: "slug",
        label: "Slug",
        inputType: "text",
        placeholder: "auto-generated or enter manually",
        required: true,
    },
    {
        key: "category_id",
        label: "Category",
        inputType: "select",
        placeholder: "Select category",
        required: true,
        options: [], // fill dynamically from categories API
    },
    {
        key: "description",
        label: "Description",
        inputType: "textarea",
        placeholder: "Enter description",
    },
    {
        key: "type",
        label: "Content Type",
        inputType: "select",
        options: [
            { label: "Movie", value: "movie" },
            { label: "TV Show", value: "tv_show" },
            { label: "Documentary", value: "documentary" },
            { label: "Anime", value: "anime" },
            { label: "Music Video", value: "music_video" },
            { label: "Other", value: "other" },
        ],
        defaultValue: "movie",
        required: true,
    },
    {
        key: "release_date",
        label: "Release Date",
        inputType: "text", // or use a "date" component in your UI
        placeholder: "YYYY-MM-DD",
    },
    {
        key: "poster_image_url",
        label: "Poster Image URL",
        inputType: "text",
        placeholder: "https://example.com/poster.jpg",
    },
    {
        key: "trailer_url",
        label: "Trailer URL",
        inputType: "text",
        placeholder: "https://youtube.com/...",
    },
    {
        key: "backdrop_image_url",
        label: "Backdrop Image URL",
        inputType: "text",
        placeholder: "https://example.com/backdrop.jpg",
    },
    {
        key: "stream_url",
        label: "Stream URL",
        inputType: "text",
        placeholder: "https://example.com/stream.m3u8",
    },
    {
        key: "running_time",
        label: "Running Time",
        inputType: "text",
        placeholder: "120 min",
    },
    {
        key: "rating",
        label: "Rating",
        inputType: "number",
        placeholder: "8.5",
    },
    {
        key: "budget",
        label: "Budget",
        inputType: "number",
        placeholder: "50000000",
    },
    {
        key: "tags",
        label: "Tags",
        inputType: "text",
        placeholder: "action, drama, thriller",
    },
    {
        key: "languages",
        label: "Languages",
        inputType: "text",
        placeholder: "English, Japanese",
    },
    {
        key: "is_active",
        label: "Active",
        inputType: "switch",
        defaultValue: true,
    },
    {
        key: "sequence",
        label: "Sequence",
        inputType: "number",
        placeholder: "1",
        defaultValue: 0,
    },
    {
        key: "cast",
        label: "Cast",
        inputType: "textarea",
        placeholder: "Enter cast names",
    },
    {
        key: "director",
        label: "Director",
        inputType: "text",
        placeholder: "Enter director name",
    },
];

// async function getContentInfo(id: number): Promise<Content | null> {
//     try {
//         const content = await getContent(id);
//         if (!content) throw new Error("Failed to fetch content");
//         return schema.parse(content);
//     } catch (error) {
//         console.error("Error fetching content info:", error);
//         return null;
//     }
// }


export const AddEditDialog = ({
    mode,
    data,
    onSubmit,
}: {
    mode: "add" | "edit" | "view" | "delete"
    data?: Content
    onSubmit?: (values: Content) => void
}) => {
    const router = useRouter();
    const formId = useId()
    const [open, setOpen] = useState(false)

    const defaultValues = React.useMemo(
        () => ({
            id: data?.id,
            title: data?.title ?? "",
            slug: data?.slug ?? data?.title ?? "",
            category_id: data?.category_id ?? undefined,
            type: 'movie',
            is_active: data?.is_active ?? true,
            sequence: data?.sequence ?? 0,
        }),
        [data]
    )


    const form = useForm<Content>({
        resolver: zodResolver(schema),
        defaultValues : {...defaultValues},
    })


    // Reset when opening (important for edit/view)
    React.useEffect(() => {
        if (open) {
            form.reset({ ...defaultValues })
        }
    }, [open, data, form, defaultValues])

    async function handleSubmitForm(values: Content) {
        try {
            // await submitContent(values, mode)
            toast.success(`Content ${mode === 'add' ? 'Added' : 'Updated'} successfully`)
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
            // await submitSocialLink(data, "delete")
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
                            <p><strong>Slug:</strong> {data?.slug}</p>
                            {/* <p><strong>Active:</strong> {data?.is_active ? "Yes" : "No"}</p>
                            <p><strong>Sequence:</strong> {data?.sequence}</p> */}
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
