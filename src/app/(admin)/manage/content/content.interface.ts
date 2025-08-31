import {z} from 'zod';

export interface SocialLinkInterface {
    id?: number;
    title: string;
    url: string;
    icon_url?: string;
    is_active: boolean;
    sequence: number;
}

// Define a TypeScript enum for content types
export enum ContentType {
    MOVIE = 'movie',
    TV_SHOW = 'tv_show',
    DOCUMENTARY = 'documentary',
    ANIME = 'anime',
    MUSIC_VIDEO = 'music_video',
    OTHER = 'other',
}

// Use z.enum for schema validation
export const contentTypeSchema = z.enum([ContentType.MOVIE, ContentType.TV_SHOW, ContentType.DOCUMENTARY, ContentType.ANIME, ContentType.MUSIC_VIDEO, ContentType.OTHER]);

// Common validators
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const schema = z.object({
    id: z.number().int().positive().optional(),

    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1).regex(slugRegex, 'Slug must be kebab-case'),
    category_id: z.number().int().positive(),

    description: z.string().nullable().optional(),
    // type: contentTypeSchema.default(ContentType.MOVIE),
    type: z.string(),

    release_date: z.string().datetime({offset: true}).nullable().optional(),

    poster_image_url: z.string().url().nullable().optional(),
    trailer_url: z.string().url().nullable().optional(),
    backdrop_image_url: z.string().url().nullable().optional(),
    stream_url: z.string().url().nullable().optional(),

    running_time: z.string().nullable().optional(),

    rating: z.number().min(0).max(10).nullable().optional(),

    budget: z.number().nullable().optional(),

    tags: z.string().nullable().optional(),
    languages: z.string().nullable().optional(),

    is_active: z.boolean(),
    sequence: z.number().int().min(0),

    cast: z.string().nullable().optional(),
    director: z.string().nullable().optional(),
});

export type Content = z.infer<typeof schema>;
