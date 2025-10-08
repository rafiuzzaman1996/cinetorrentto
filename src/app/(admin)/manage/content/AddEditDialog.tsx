"use client"
import React from "react"

import { useState, useId } from "react"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash, PlusCircle, LoaderCircle } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { schema, ContentSchema } from "@/app/(admin)/manage/content/content.interface"
import { DynamicForm, FieldConfig } from "../../../../components/admin/management/data-table/DynamicForm"
import { getContent, submitContent } from "../../admin-api/ContentApi"
import { getAllCategories } from "../../admin-api/CategoryApi"
import { Category } from "@/types/admin/Category"
import { getAllGenres } from "../../admin-api/GenreApi"
import { Genre } from "@/types/admin/Genre"
import { Content } from "@/types/admin/Content"

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
        inputType: "text",
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
    {
        key: "genres",
        label: "Genre",
        inputType: "multi-select",
        placeholder: "Select genre",
        required: false,
        multiple: true,
        multiSelectOptions: [], // fill dynamically from genres API
    },
    {
        key: "downloadLinks",
        label: "Download Links",
        inputType: "dynamic-array",
        arrayItemConfig: [
            {
                key: "name",
                label: "Name",
                inputType: "text",
                placeholder: "Enter name",
                // required: true,
            },
            {
                key: "url",
                label: "URL",
                inputType: "text",
                placeholder: "https://example.com/file.zip",
                // required: true,
            },
            {
                key: "size",
                label: "Size",
                inputType: "text",
                placeholder: "e.g., 1.5 GB",
                // required: false,
            }
        ]
    }
];

async function getContentInfo(id: number): Promise<Content | null> {
    try {
        const content = await getContent(id);
        if (!content) throw new Error("Failed to fetch content");
        return content;
    } catch (error) {
        console.error("Error fetching content info:", error);
        return null;
    }
}


export const AddEditDialog = ({
    mode,
    data,
    onSubmit,
}: {
    mode: "add" | "edit" | "view" | "delete"
    data?: ContentSchema
    onSubmit?: (values: ContentSchema) => void
}) => {
    const router = useRouter();
    const formId = useId()
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const defaultValues = React.useMemo(
        () => ({
            id: data?.id,
            title: data?.title ?? "",
            slug: data?.slug ?? data?.title ?? "",
            category_id: data?.category_id ?? undefined,
            type: 'movie',
            is_active: data?.is_active ?? true,
            sequence: data?.sequence ?? 0,
            genres: [],
            downloadLinks: [{ name: '', url: '', size: '' }],
        }),
        [data]
    )

    const handleDialogOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (isOpen && (mode === "edit" || mode === "add")) {
            setIsLoading(true);
            // Fetch categories and genres
            Promise.all([getAllCategories(), getAllGenres()])
                .then(([categories, genres]) => {
                    if (categories) {
                        // update fields categories options
                        fields.find(f => f.key === "category_id")!.options = categories.data.map((cat: Category) => ({
                            value: cat.id,
                            label: cat.title
                        }));
                    }
                    if (genres) {
                        // update fields genres options
                        fields.find(f => f.key === "genres")!.multiSelectOptions = genres.data.map((gen: Genre) => ({
                            value: String(gen.id),
                            label: gen.title
                        }));
                    }
                })
                .catch((error) => {
                    console.error("Error fetching categories or genres:", error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }

        if (isOpen && mode === "edit" && data?.id !== undefined) {
            setIsLoading(true);
            // Fetch content data from API
            getContentInfo(data.id).then((content) => {
                if (content) {
                    const genreIds = content.genres
                        ?.filter((genre): genre is Genre => typeof genre === "object" && genre !== null && "id" in genre)
                        .map((genre) => String(genre.id)!)
                        .filter(Boolean) ?? [];
                    form.reset(schema.parse({ ...content, genres: genreIds }));
                }
            }).catch((error) => {
                console.error("Error fetching content info:", error);
            }).finally(() => {
                setIsLoading(false);
            });
        }



    }

    const form = useForm<ContentSchema>({
        resolver: zodResolver(schema),
        defaultValues: { ...defaultValues },
    })

    // get content data if in edit mode using API
    // React.useEffect(() => {

    //     if (open && mode === "edit" && data?.id !== undefined) {
    //         // Fetch content data from API
    //         const fetchData = async () => {
    //             if (data.id === undefined) return;

    //             const content = await getContentInfo(data.id);
    //             if (content) {
    //                 const genreIds = content.genres
    //                     ?.filter((genre): genre is Genre => typeof genre === "object" && genre !== null && "id" in genre)
    //                     .map((genre) => String(genre.id)!)
    //                     .filter(Boolean) ?? [];
    //                 form.reset(schema.parse({ ...content, genres: genreIds }));
    //             }
    //         };
    //         fetchData();
    //         setIsLoading(false);
    //     }
    // }, [data?.id, form, mode, open])


    // Reset when opening (important for edit/view)
    React.useEffect(() => {
        if (open) {
            form.reset({ ...defaultValues })
        }
    }, [open, data, form, defaultValues])

    async function handleSubmitForm(values: ContentSchema) {
        try {
            const result = await submitContent(values, mode)
            if (!result) throw new Error("Submission failed")
            toast.success(`Content ${mode === 'add' ? 'Added' : 'Updated'} successfully`)
            setOpen(false)
            onSubmit?.(values)
            router.refresh()

        } catch (err) {
            toast.error("Submission failed ❌")
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
            await submitContent(data, "delete")
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
        <Dialog open={open} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
                {mode === "add" ? (
                    <Button variant="outline" size="sm" className="cursor-pointer">
                        <PlusCircle />
                        <span className="hidden lg:inline">Add</span>
                    </Button>
                ) : (
                    <Button variant="ghost" size="icon" className="cursor-pointer">
                        {mode === "view" && <Eye color="#2eff46" />}
                        {mode === "edit" && <Pencil color="#9933ff" />}
                        {mode === "delete" && <Trash color="#ff3d51" />}
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
                    <DialogDescription>
                        <VisuallyHidden>
                            Dialog Description
                        </VisuallyHidden>
                    </DialogDescription>
                </DialogHeader>

                {isLoading ? (
                    // loading spinner center of the dialog
                    <div className="h-auto flex justify-center items-center flex-1">
                        <LoaderCircle size={50} className="animate-spin" />
                    </div>
                ) : (
                    <>
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
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
