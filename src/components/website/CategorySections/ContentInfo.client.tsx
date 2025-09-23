// ContentInfo.client.tsx
'use client'
import { Suspense } from "react"
import ContentInfo from "./ContentInfo2"

export default function ContentInfoClient({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <ContentInfo slug={slug} />
    </Suspense>
  )
}
