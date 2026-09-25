import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Mengekstrak File ID dari berbagai format link Google Drive
 */
export function extractGoogleDriveId(url?: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // Pola 1: lh3.googleusercontent.com/d/FILE_ID
  const lh3Match = trimmed.match(/lh3\.googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
  if (lh3Match && lh3Match[1]) return lh3Match[1].split('=')[0];

  // Pola 2: drive.google.com/file/d/FILE_ID
  const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch && fileDMatch[1]) return fileDMatch[1];

  // Pola 3: drive.google.com/?id=FILE_ID atau uc?id=FILE_ID atau thumbnail?id=FILE_ID
  const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) return idMatch[1];

  // Pola 4: /api/drive-image?id=FILE_ID
  const proxyMatch = trimmed.match(/\/api\/drive-image\?id=([a-zA-Z0-9_-]+)/);
  if (proxyMatch && proxyMatch[1]) return proxyMatch[1];

  return null;
}

/**
 * Mengonversi link sharing Google Drive menjadi link proxy gambar web lokal (/api/drive-image)
 * atau mengembalikan URL asli jika bukan dari Google Drive.
 */
export function formatImageUrl(url?: string): string {
  if (!url) return '';
  const trimmed = url.trim();

  // Jika URL lokal /uploads/ atau base64
  if (trimmed.startsWith('/uploads/') || trimmed.startsWith('data:image/')) {
    return trimmed;
  }

  // Jika Google Drive link
  const driveId = extractGoogleDriveId(trimmed);
  if (driveId) {
    return `/api/drive-image?id=${driveId}`;
  }

  return trimmed;
}

export function isGoogleDriveUrl(url?: string): boolean {
  if (!url) return false;
  return extractGoogleDriveId(url) !== null;
}
