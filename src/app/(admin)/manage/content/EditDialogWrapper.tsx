'use server'

import { getContent } from "@/app/(admin)/admin-api/ContentApi"
import { AddEditDialog } from "./AddEditDialog"


const EditDialogWrapper = async ({ id }: { id: number }) => {
  const content = await getContent(id) // SSR fetch
  console.log('🩸🩸 ~ content:', content);
  return <AddEditDialog mode="edit" data={content ?? undefined} />
}

export default EditDialogWrapper