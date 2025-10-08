"use client"
import React, { useCallback, useRef } from "react"

import { useState, useId } from "react"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash, PlusCircle } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, Path, useForm } from "react-hook-form"
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
import AsyncSelect from 'react-select/async';
import { useTheme } from "next-themes"; // if you use next-themes for dark mode

interface optionType {
    label: string;
    value: number;
}
const fields: FieldConfig<typeof schema>[] = [
    {
        key: "content_id",
        label: "Content",
        inputType: "select" as const,
        placeholder: "Select Content",
        options: [], // Will be populated dynamically
        required: true
    },
    { key: "sequence", label: "Sequence", inputType: "number" as const },
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
    const { theme } = useTheme();
    const router = useRouter();
    const formId = useId()
    const [open, setOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<optionType | null>(null);

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

    const getContentsOptions = (query: string) => {
        return getContents({ search: query, limit: 10, page: 1 }).then((res) => {
            return res.data.map((content: Content) => ({
                label: content.title,
                value: content.id,
            }));
        });
    }

    const promiseOptions = (inputValue: string) =>
        new Promise<optionType[]>((resolve) => {
            setTimeout(() => {
                resolve(getContentsOptions(inputValue));
            }, 1000);
        });

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
                                                            ) : fieldConfig.inputType === "number" ? (
                                                                <Input
                                                                    type="number"
                                                                    placeholder={fieldConfig.placeholder}
                                                                    value={field.value ?? 1}
                                                                    onChange={
                                                                        (e) => field.onChange(parseInt(e.target.value, 10))
                                                                    }
                                                                    disabled={fieldConfig.disabled}
                                                                    readOnly={fieldConfig.readOnly}
                                                                    className={fieldConfig.className}
                                                                    style={fieldConfig.style}
                                                                />
                                                            ) : fieldConfig.inputType === "select" ? (
                                                                <Controller
                                                                    control={form.control}
                                                                    name="content_id"
                                                                    rules={{ required: true }}
                                                                    render={({ field: controllerField }) => (
                                                                        <AsyncSelect
                                                                            required
                                                                            value={
                                                                                controllerField.value
                                                                                    ? selectedOption
                                                                                    : null
                                                                            }
                                                                            onChange={(option) => {
                                                                                setSelectedOption(option);
                                                                                controllerField.onChange(option ? option.value : null)
                                                                            }}
                                                                            cacheOptions
                                                                            defaultOptions
                                                                            loadOptions={promiseOptions}
                                                                            unstyled
                                                                            isClearable
                                                                            menuPortalTarget={null}              // 👈 keep menu inside Dialog
                                                                            menuPosition="absolute"
                                                                            menuPlacement="bottom"
                                                                            menuShouldScrollIntoView={false}     // 👈 prevents weird jumping
                                                                            classNames={{
                                                                                control: ({ isFocused }) =>
                                                                                    `flex min-h-[40px] w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm
                                                                                    placeholder:text-muted-foreground
                                                                                    focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                                                                                    disabled:cursor-not-allowed disabled:opacity-50
                                                                                    ${isFocused ? "border-ring ring-2 ring-ring ring-offset-2" : "border-input"}`,
                                                                                valueContainer: () => "flex gap-1 flex-wrap",
                                                                                input: () => "text-sm text-foreground bg-transparent focus:outline-none",
                                                                                placeholder: () => "text-muted-foreground text-sm",
                                                                                singleValue: () => "text-sm text-foreground",
                                                                                multiValue: () =>
                                                                                    "flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground",
                                                                                multiValueRemove: () =>
                                                                                    "ml-1 cursor-pointer text-muted-foreground hover:text-foreground",
                                                                                indicatorsContainer: () => "flex items-center gap-1",
                                                                                indicatorSeparator: () => "hidden",
                                                                                dropdownIndicator: ({ isFocused }) =>
                                                                                    `p-1 cursor-pointer text-muted-foreground hover:text-foreground transition ${isFocused ? "text-foreground" : ""
                                                                                    }`,
                                                                                clearIndicator: () =>
                                                                                    "p-1 cursor-pointer text-muted-foreground hover:text-foreground transition",
                                                                                menu: () =>
                                                                                    "mt-2 rounded-md border bg-popover text-popover-foreground shadow-md",
                                                                                menuList: () => "max-h-60 overflow-auto p-1",
                                                                                option: ({ isFocused, isSelected }) =>
                                                                                    `cursor-pointer rounded-sm px-2 py-1.5 text-sm
                                                                                    ${isSelected ? "bg-accent text-accent-foreground" : ""}
                                                                                    ${isFocused && !isSelected ? "bg-accent/50 text-accent-foreground" : ""}`,
                                                                                noOptionsMessage: () => "text-muted-foreground p-2 text-sm",
                                                                            }}
                                                                        />
                                                                    )}
                                                                />
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
