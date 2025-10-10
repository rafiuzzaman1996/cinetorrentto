import { z } from "zod"
export const schema = z.object({
  id: z.number().optional(),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  placement: z.string(),
  code: z.string().optional(),
  url: z.string(),
  format: z.string().optional(),
  size: z.string().optional(),
  is_active: z.boolean().optional(),
  sequence: z.number().optional(),
})

export type AdsForm = z.infer<typeof schema>
