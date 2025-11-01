export interface Attachment {
  id: string;
  originalName: string;
  originalFileName: string;
  path: string;
  originalSize: number;
  fileName1280: string;
  path1280: string;
  size1280: number;
  fileName320: string;
  path320: string;
  size320: number;
  type: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
