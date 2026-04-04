import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");
const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function saveFile(file: File): Promise<string> {
  if (file.size > MAX_SIZE) throw new Error("File too large");
  if (!ALLOWED_TYPES.includes(file.type)) throw new Error("Invalid file type");

  if (!existsSync(UPLOAD_DIR)) await mkdir(UPLOAD_DIR, { recursive: true });

  const ext = file.name.split(".").pop() || "bin";
  const fileId = `${uuid()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, fileId), buffer);

  return fileId;
}

export async function getFile(fileId: string): Promise<{ buffer: Buffer; ext: string } | null> {
  const filePath = path.join(UPLOAD_DIR, fileId);
  if (!filePath.startsWith(UPLOAD_DIR)) return null;
  if (!existsSync(filePath)) return null;

  const buffer = await readFile(filePath);
  const ext = fileId.split(".").pop() || "bin";
  return { buffer, ext };
}
