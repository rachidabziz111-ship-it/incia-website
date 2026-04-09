import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import FloatingCart from "@/components/FloatingCart";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MédicAura | Premium Medical Aesthetics",
  description: "B2B Medical Aesthetics & Professional Skin Care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="no" suppressHydrationWarning>
      <body className={inter.className}>
        <CartProvider>
          {children}
          <FloatingCart />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}