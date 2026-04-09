import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. كنجيبو الذاكرة ديال السلة لي صايبنا فالأول
import { CartProvider } from "@/context/CartContext";

// 2. كنجيبو المكون ديال السلة العائمة لي غتبان لتحت
import FloatingCart from "@/components/FloatingCart";

// 3. كنجيبو البوطونة ديال الواتساب لي عاد صايبنا 👈
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
    <html lang="en" translate="no">
      <body className={inter.className}>
        
        {/* غلفنا السيت كامل بذاكرة السلة باش يبقى عاقل على المنتجات فين ما مشينا */}
        <CartProvider>
          
          {/* هادو هما الصفحات ديال السيت (الرئيسية، المنتجات...) */}
          {children}
          
          {/* حطينا السلة العائمة هنا لتحت باش تبقى ديما باينة وتابعاك فكل الصفحات */}
          <FloatingCart />
          
          {/* البوطونة العائمة ديال الواتساب زدناها هنا 👈 */}
          <WhatsAppButton />
          
        </CartProvider>

      </body>
    </html>
  );
}