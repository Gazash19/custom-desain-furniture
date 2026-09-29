import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PAPO3D — Studio Jasa Desain Custom Furniture & Gambar Kerja 3D",
  description: "Jasa desain custom furniture, visualisasi 3D photorealistic, dan gambar kerja teknis mebel kayu asli Jepara berstandar presisi siap bengkel workshop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${jakarta.variable} ${outfit.variable}`}>
      <body className="font-sans bg-[#0B0F17] text-slate-100 min-h-screen">{children}</body>
    </html>
  );
}

