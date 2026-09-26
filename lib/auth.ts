// lib/auth.ts
// Modul otentikasi admin berbasis Web Crypto API & Signed Cookies (Universal Edge & Node.js)

export const ADMIN_COOKIE_NAME = 'admin_session';

function getSecretKey(): string {
  return process.env.ADMIN_SESSION_SECRET || 'papo3d_secret_key_jepara_2026_custom_furniture';
}

/**
 * Menghasilkan hash SHA-256 menggunakan Web Crypto API standar
 */
async function generateSignature(dataText: string): Promise<string> {
  const encoder = new TextEncoder();
  const secret = getSecretKey();
  const data = encoder.encode(`${dataText}:${secret}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Membuat token session yang ditandatangani secara kriptografis
 */
export async function createSessionToken(): Promise<string> {
  const timestamp = Date.now().toString();
  const signature = await generateSignature(timestamp);
  return `${timestamp}.${signature}`;
}

/**
 * Memvalidasi keabsahan token session (termasuk masa berlaku 7 hari)
 */
export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [timestamp, signature] = parts;
  const time = parseInt(timestamp, 10);

  // Cek apakah timestamp valid dan belum kadaluarsa (7 hari)
  if (isNaN(time) || Date.now() - time > 7 * 24 * 60 * 60 * 1000) {
    return false;
  }

  const expectedSignature = await generateSignature(timestamp);
  return signature === expectedSignature;
}

/**
 * Memvalidasi kredensial admin (username dan kata sandi) dari environment
 */
export function validateAdminCredentials(inputUsername: string, inputPassword: string): boolean {
  const correctUsername = process.env.ADMIN_USERNAME || 'admin';
  const correctPassword = process.env.ADMIN_PASSWORD || 'adminpapo3d';
  return (
    inputUsername.trim().toLowerCase() === correctUsername.trim().toLowerCase() &&
    inputPassword.trim() === correctPassword.trim()
  );
}

/**
 * Memvalidasi kata sandi input dengan kata sandi admin di environment
 */
export function validateAdminPassword(inputPassword: string): boolean {
  const correctPassword = process.env.ADMIN_PASSWORD || 'adminpapo3d';
  return inputPassword.trim() === correctPassword.trim();
}
