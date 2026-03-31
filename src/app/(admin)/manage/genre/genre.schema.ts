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
  is_active: z.boolean().optional(),
  sequence: z.number().optional(),
})

export type GenreForm = z.infer<typeof schema>
