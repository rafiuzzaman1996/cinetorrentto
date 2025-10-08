"use client"
import React, { useCallback, useRef } from "react"

import { useState, useId } from "react"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash, PlusCircle } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Path, useForm } from "react-hook-form"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { FieldConfig } from "../../../../components/admin/management/data-table/DynamicForm"
import { FeaturedContentForm, schema } from "./FeaturedContent.schema"
import { submitFeaturedContents } from "../../admin-api/FeaturedContentApi"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MultiSelectOption, MultiSelectWithSearch } from "@/components/ui/multi-select-search"
import { useApiSearch } from "./api-search"
import { getContents } from "../../admin-api/ContentApi"
import { Content } from "@/types/admin/Content"

const fields: FieldConfig<typeof schema>[] = [
    {
        key: "content_id",
        label: "Content",
        inputType: "select" as const,
        placeholder: "Select Content",
        options: [], // Will be populated dynamically
        required: true
    },
    { key: "sequence", label: "Sequence", inputType: "number" as const, placeholder: "1" },
];

export const AddEditDialog = ({
    mode,
    data,
    onSubmit,
}: {
    mode: "add" | "edit" | "view" | "delete"
    data?: FeaturedContentForm
    onSubmit?: (values: FeaturedContentForm) => void
}) => {
    const router = useRouter();
    const formId = useId()
    const [open, setOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState<MultiSelectOption[]>([]);

    const form = useForm<FeaturedContentForm>({
        resolver: zodResolver(schema),
        defaultValues: {
            id: data?.id ?? 0,
            content_id: data?.content_id ?? 0,
            sequence: data?.sequence ?? 1,
        },
    })

    // Reset when opening (important for edit/view)
    React.useEffect(() => {
        if (open) {
            form.reset({
                id: data?.id ?? 0,
                content_id: data?.content_id ?? 0,
                sequence: data?.sequence ?? 1,
            })
        }
    }, [open, data, form])

    async function handleSubmitForm(values: FeaturedContentForm) {
        try {
            const result = await submitFeaturedContents(values, mode)
            if (result && 'error' in result || !result) {
                toast.error(`Submission failed: ${result}`)
                return
            }
            toast.success(`Featured Content ${mode === 'add' ? 'Added' : 'Updated'} successfully`)
            setOpen(false)
            onSubmit?.(values)
            router.refresh()

        } catch (err) {
            toast.error("Submission failed ❌" + err)
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
            await submitFeaturedContents(data, "delete")
            toast.success("Featured Content deleted successfully ✅")
            setOpen(false)
            onSubmit?.(data)
            router.refresh()
        } catch (err) {
            toast.error("Failed to delete Genre ❌")
            console.error(err)
        }
    }

    const [options, setOptions] = useState<MultiSelectOption[]>([]);
    const [loading, setLoading] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const debounceMs = 300;
    const minQueryLength = 2;
    const search = useCallback(
        async (query: string) => {
            if (query.length < minQueryLength) {
                setOptions([]);
                return;
            }

            setLoading(true);
            try {
                //    const response = await fetch(`${apiUrl}?q=${encodeURIComponent(query)}`);
                const data = await getContents({
                    page: 1,
                    limit: 10,
                    search: query
                });
                console.log('🩸🩸 ~ data:', data);
                //    if (!response.ok) {
                //      throw new Error("Failed to fetch");
                //    }
                //    const data = await response.json();
                setOptions(data.data.map((item: Content) => ({ value: item.id, label: item.title })) || []);
                console.log('🩸🩸 ~ options:', options);
            } catch (error) {
                console.error("Search error:", error);
                setOptions([]);
            } finally {
                setLoading(false);
            }
        },
        [minQueryLength]
    );
    const debouncedSearch = useCallback(
        (query: string) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                search(query);
            }, debounceMs);
        },
        [search, debounceMs]
    );

    const handleSearch = (query: string) => {
        debouncedSearch(query);
    };

    const handleChange = (selected: MultiSelectOption[]) => {
        setSelectedOptions(selected);
        console.log("Selected options:", selected);
    };

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
                        {mode === "view" && <Eye color="#2eff46" />}
                        {mode === "edit" && <Pencil color="#9933ff" />}
                        {mode === "delete" && <Trash color="#ff3d51" />}
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-6/12 w-full h-[80vh] p-2 flex flex-col">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "add" && "Add Genre"}
                        {mode === "edit" && "Edit Genre"}
                        {mode === "view" && "View Genre"}
                        {mode === "delete" && "Delete Genre"}
                    </DialogTitle>
                    <VisuallyHidden>
                        <div>Dialog Description</div>
                    </VisuallyHidden>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-1">
                    {mode === "view" ? (
                        <div className="space-y-2">
                            <p><strong>Sequence:</strong> {data?.sequence}</p>
                        </div>
                    ) : mode === "delete" ? (
                        <div className="space-y-4">
                            {/* <p>Are you sure you want to delete <strong>{data?.title}</strong>?</p> */}
                        </div>
                    ) : (
                        <div className="">
                            {/* <DynamicForm<typeof schema>
                            form={form}
                            formId={formId}
                            fields={fields}
                            onSubmit={handleSubmitForm}
                        /> */}
                            <Form {...form}>
                                <form
                                    id={formId}
                                    onSubmit={form.handleSubmit(handleSubmitForm)}
                                    className="space-y-4"
                                >
                                    {fields.map((fieldConfig) => {
                                        return (
                                            <FormField
                                                key={fieldConfig.key}
                                                control={form.control}
                                                name={fieldConfig.key as Path<FeaturedContentForm>}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{fieldConfig.label ?? fieldConfig.key}</FormLabel>
                                                        <FormControl>
                                                            {fieldConfig.inputType === "text" ? (
                                                                <Input
                                                                    placeholder={fieldConfig.placeholder}
                                                                    value={field.value ?? ""}
                                                                    onChange={field.onChange}
                                                                    disabled={fieldConfig.disabled}
                                                                    readOnly={fieldConfig.readOnly}
                                                                    className={fieldConfig.className}
                                                                    style={fieldConfig.style}
                                                                />
                                                            ) : fieldConfig.inputType === "select" ? (
                                                                <>
                                                                <pre>
                                                                    {JSON.stringify(options, null, 2)}
                                                                </pre>
                                                                <MultiSelectWithSearch
                                                                    options={options}
                                                                    // ✅ integrate with react-hook-form
                                                                    selected={selectedOptions}
                                                                    onChange={(selected) => {
                                                                        setSelectedOptions(selected)
                                                                        // ✅ update react-hook-form value
                                                                        field.onChange(selected[0]?.value ?? 0)
                                                                    }}
                                                                    onSearch={handleSearch}
                                                                    placeholder="Select content..."
                                                                    searchPlaceholder="Search content by title..."
                                                                    emptyMessage="No content found."
                                                                    loading={loading}
                                                                    multi={false}
                                                                    maxDisplay={10}
                                                                    />
                                                                    </>
                                                            ) : null}
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )
                                    })}
                                </form>
                            </Form>
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
