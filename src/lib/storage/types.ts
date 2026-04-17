export const MAX_SIZE = 5 * 1024 * 1024;
export const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

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
