import {z} from 'zod';

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

const customDateSchema = z.string().regex(/^\d{4}\/\d{2}\/\d{2}$/, "Invalid date format, expected YYYY/MM/DD")
  .transform((str) => {
    // Optional: You can further validate if the date is a real date here if needed
    // For example, using a library like date-fns or a custom function
    return str; // Returns the string in the desired YYYY/MM/DD format
  });
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

    release_date: z.iso.date().nullable().optional(),

    poster_image_url: z.string().nullable().optional(),
    trailer_url: z.url().nullable().optional(),
    backdrop_image_url: z.url().nullable().optional(),
    stream_url: z.url().nullable().optional(),

    running_time: z.string().nullable().optional(),

    rating: z.number().min(0).max(10).nullable().optional(),

    budget: z.string().nullable().optional(),

    tags: z.string().nullable().optional(),
    languages: z.string().nullable().optional(),

    is_active: z.boolean(),
    sequence: z.number().int().min(0),

    cast: z.string().nullable().optional(),
    director: z.string().nullable().optional(),

    genres: z.array(z.any()).optional().nullable(),

    downloadLinks: z.array(z.object({
        name: z.string().min(1, 'Name is required'),
        url: z.url('Invalid URL').min(1, 'URL is required'),
        size: z.string().nullable().optional(),

    })).optional().nullable(),
});

export type ContentSchema = z.infer<typeof schema>;
