export const MAX_SIZE = 5 * 1024 * 1024;
// รองรับไฟล์รูปภาพ + PDF (PRD FR-2.5: L3 business registration รับ PDF ได้)
// Client validation ใน VerificationClient.tsx ยอมรับ application/pdf สำหรับ L3
// อยู่แล้ว — นี่คือ server-side match เพื่อให้ upload ไม่ silently drop
export const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

export type GetFileUrlOptions = {
  signed?: boolean;
  expiresIn?: number;
};

export interface Storage {
  saveFile(file: File): Promise<string>;
  getFile(fileId: string): Promise<{ buffer: Buffer; ext: string } | null>;
  getFileUrl(fileId: string, opts?: GetFileUrlOptions): Promise<string>;
  deleteFile(fileId: string): Promise<void>;
}

export function validateUpload(file: File): void {
  if (file.size > MAX_SIZE) throw new Error("File too large");
  if (!ALLOWED_TYPES.includes(file.type)) throw new Error("Invalid file type");
}

export function fileIdExt(fileId: string): string {
  return fileId.split(".").pop() || "bin";
}
