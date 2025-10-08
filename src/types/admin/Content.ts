import { Genre } from "./Genre";

export interface Content {
    id?: number;
    title: string;
    slug: string;
    category_id: number;
    description?: string;
    type: string;
    release_date?: Date;
    poster_image_url?: string;
    trailer_url?: string;
    backdrop_image_url?: string;
    stream_url?: string;
    running_time?: string;
    rating?: number;
    budget?: number;
    tags?: string[];
    languages?: string[];
    is_active: boolean;
    sequence: number;
    cast?: string[];
    director?: string[];
    category?: object;
    genres?: Genre[];
}