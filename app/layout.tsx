import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PAPO3D — Jasa Desain Custom Furniture & Gambar Kerja",
  description: "Jasa desain custom furniture, visualisasi 3D, dan gambar kerja teknis mebel kayu asli Jepara siap produksi tukang bengkel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
