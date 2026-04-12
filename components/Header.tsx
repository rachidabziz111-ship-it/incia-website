"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Amiri } from "next/font/google"; 

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center relative min-h-[80px] py-3">
          
          {/* الجهة اليمنى: الروابط كاملة (فالبيسي) وزر القائمة (فالتليفون) */}
          <div className="flex items-center z-10 lg:w-5/12">
            {/* Desktop Nav - رجعنا الروابط لي تحيدو */}
            <nav className={`${amiri.className} hidden lg:flex items-center gap-6`}>
              <Link href="/" className="text-lg font-bold text-[#0B3B60] hover:text-[#D4AF37] transition-colors">الرئيسية</Link>
              <Link href="/about" className="text-lg font-bold text-[#0B3B60] hover:text-[#D4AF37] transition-colors">مختبراتنا</Link>
              <Link href="/products" className="text-lg font-bold text-[#0B3B60] hover:text-[#D4AF37] transition-colors">كتالوج الجملة</Link>
              <Link href="/contact" className="text-lg font-bold text-[#0B3B60] hover:text-[#D4AF37] transition-colors">تواصل معنا</Link>
            </nav>

            {/* Mobile Menu Button - أيقونة التليفون */}
            <button 
              onClick={toggleMenu}
              className="lg:hidden p-2 text-[#0B3B60] hover:text-[#D4AF37] focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* الوسط تماماً: اللوغو */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex justify-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-16 h-16 transition-transform group-hover:scale-105">
                <Image 
                  src="/logo.png" 
                  alt="INCIA Laboratory Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-serif text-2xl md:text-3xl font-bold text-[#0B3B60] tracking-wider hidden sm:block" dir="ltr">
                INCIA<span className="text-[#D4AF37] ml-0.5">®</span>
              </span>
            </Link>
          </div>

          {/* الجهة اليسرى: رابط العيادة (للبنات) + زر ابدأ براندك (للمستثمرين) */}
          <div className="hidden lg:flex items-center justify-end z-10 lg:w-5/12 gap-5">
            {/* رابط العيادة الطبية */}
            <Link 
              href="/clinic" 
              className={`${amiri.className} text-[#D4AF37] hover:text-[#0B3B60] transition-colors text-lg font-bold flex items-center gap-1.5`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
              العيادة
            </Link>

            {/* زر الجملة */}
            <Link
              href="/wholesale"
              className={`${amiri.className} bg-[#D4AF37] hover:bg-[#b5952f] text-white px-7 py-2.5 rounded-full text-lg font-bold transition-all shadow-md hover:shadow-lg`}
            >
              ابدأ براندك
            </Link>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown (القائمة اللي كتهبط فالتليفون) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-2xl z-40 max-h-[80vh] overflow-y-auto">
          <nav className={`${amiri.className} flex flex-col px-6 pt-4 pb-8 space-y-4`}>
            <Link href="/" onClick={toggleMenu} className="block text-lg font-bold text-[#0B3B60] hover:text-[#D4AF37]">الرئيسية</Link>
            <Link href="/about" onClick={toggleMenu} className="block text-lg font-bold text-[#0B3B60] hover:text-[#D4AF37]">مختبراتنا</Link>
            <Link href="/contact" onClick={toggleMenu} className="block text-lg font-bold text-[#0B3B60] hover:text-[#D4AF37]">تواصل معنا</Link>
            
            {/* قسم خاص بالعيادة (للأفراد) */}
            <div className="pt-4 mt-2 border-t border-gray-100">
              <span className="text-sm text-gray-400 mb-2 block">للعناية الفردية</span>
              <Link href="/clinic" onClick={toggleMenu} className="flex items-center text-lg font-bold text-[#D4AF37] hover:text-[#0B3B60]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-2">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
                زيارة العيادة الطبية (العلاجات)
              </Link>
            </div>

            {/* قسم خاص بالجملة (للمستثمرين) */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <span className="text-sm text-gray-400 block">للتجار وأصحاب العلامات</span>
              <Link href="/products" onClick={toggleMenu} className="block text-lg font-bold text-[#0B3B60] hover:text-[#D4AF37]">كتالوج منتجات الجملة</Link>
              <Link href="/wholesale" onClick={toggleMenu} className="block w-full text-center bg-[#D4AF37] text-white px-5 py-3.5 rounded-full font-bold shadow-md hover:bg-[#b5952f] transition-colors text-lg mt-4">
                ابدأ مشروع براندك الآن
              </Link>
            </div>

          </nav>
        </div>
      )}
    </header>
  );
}