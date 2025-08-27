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
  url: z.string().url({
    message: "Please enter a valid URL.",
  }),
  icon_url: z.string().url().optional().or(z.literal("")),
  is_active: z.boolean().default(true),
  sequence: z.number().min(0),
})

export type SocialLink = z.infer<typeof schema>