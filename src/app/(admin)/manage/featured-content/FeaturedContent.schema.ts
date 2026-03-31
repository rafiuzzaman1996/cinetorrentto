import { z } from "zod"
export const schema = z.object({
  id: z.number().optional(),
  content_id: z.number(),
  sequence: z.number().optional(),
})

export type FeaturedContentForm = z.infer<typeof schema>
