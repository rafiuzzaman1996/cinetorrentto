export interface Content {
    title: string;
    slug: string;
    release_date: string;
    rating: number;
    poster_image_url: string;
    description: string;
    type: string;
    trailer_url: string;
    backdrop_image_url: string;
    stream_url: string;
    running_time: number;
    budget: string;
    tags: string[];
    languages: string[];
    is_active: boolean;
    sequence: number;
    cast: string[];
    director: string;
    genres?: {
        id: number,
        title: string
    }[];
    downloadLinks?: {
        name: string;
        size: string;
        url: string;
    }[]
}