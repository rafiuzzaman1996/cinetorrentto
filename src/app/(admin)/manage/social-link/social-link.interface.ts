import { z } from "zod"


export interface SocialLinkInterface {
    id?: number
    title: string
    url: string
    icon_url?: string
    is_active: boolean
    sequence: number
}

export const schema = z.object({
  id: z.number().optional(),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  url: z.string(),
  icon_url: z.string().optional(),
  is_active: z.boolean(),
  sequence: z.number(),
})

export type SocialLink = z.infer<typeof schema>