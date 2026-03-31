import { z } from "zod"
export const schema = z.object({
  id: z.number().optional(),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  slug: z.string().max(255).min(1, {
    message: "Slug is required.",
  }),
  image_url: z.string().optional(),
  banner_image_url: z.string().optional(),
  icon_url: z.string().optional(),
  is_active: z.boolean().optional(),
  is_featured: z.boolean().optional(),
  is_popular: z.boolean().optional(),
  is_trending: z.boolean().optional(),
  tags: z.string().optional(),
  metadata: z.string().optional(),
  external_id: z.string().optional(),
  external_source: z.string().optional(),
  external_url: z.string().optional(),
  sequence: z.number().optional(),
})

export type CategoryForm = z.infer<typeof schema>
