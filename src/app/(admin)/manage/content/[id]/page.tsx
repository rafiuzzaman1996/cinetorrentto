import { getContent } from '@/app/(admin)/admin-api/ContentApi'
import React from 'react'
import { AddEditDialog } from '../AddEditDialog'
import { DynamicForm, FieldConfig } from "../../../../../components/admin/management/data-table/DynamicForm"
import { schema, Content } from "@/app/(admin)/manage/content/content.interface"


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

const ContentEditPage = async ({ params }: { params: { id: string } }) => {
    const content = await getContent(Number(params.id))

    return (
        <>
        {content.title}
        </>
    )
}

export default ContentEditPage