"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Amiri } from "next/font/google"; 

// إعداد خط أميري ليتناسق مع باقي الموقع
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* التعديل هنا: زدنا relative و min-h-[72px] باش يحافظ على التوازن ديالو */}
        <div className="flex justify-between items-center relative min-h-[72px] py-3">
          
          {/* الجهة اليمنى: الروابط (فالبيسي) وزر القائمة (فالتليفون) */}
          <div className="flex items-center z-10 w-1/3">
            {/* Desktop Nav */}
            <nav className={`${amiri.className} hidden md:flex space-x-8 space-x-reverse`}>
              <Link href="/" className="text-lg font-bold text-[#0B3B60] hover:text-[#D4AF37] transition-colors">الرئيسية</Link>
              <Link href="/products" className="text-lg font-bold text-[#0B3B60] hover:text-[#D4AF37] transition-colors">المنتجات الطبية</Link>
              <Link href="/about" className="text-lg font-bold text-[#0B3B60] hover:text-[#D4AF37] transition-colors">مختبراتنا</Link>
              <Link href="/wholesale" className="text-lg font-bold text-[#0B3B60] hover:text-[#D4AF37] transition-colors">برنامج الشراكة</Link>
              <Link href="/contact" className="text-lg font-bold text-[#0B3B60] hover:text-[#D4AF37] transition-colors">تواصل معنا</Link>
            </nav>

            {/* Mobile Menu Button - أيقونة التليفون */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 text-[#0B3B60] hover:text-[#D4AF37] focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* الوسط تماماً: اللوغو */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <Link href="/" className="flex items-center space-x-3 space-x-reverse group">
              <div className="relative w-14 h-14 transition-transform group-hover:scale-105">
                <Image 
                  src="/logo.png" 
                  alt="INCIA Laboratory Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-serif text-2xl font-bold text-[#0B3B60] tracking-wider" dir="ltr">
                INCIA<span className="text-[#D4AF37] ml-0.5">®</span>
              </span>
            </Link>
          </div>

          {/* الجهة اليسرى: زر ابدأ براندك */}
          <div className="flex items-center justify-end z-10 w-1/3">
            <Link
              href="/wholesale"
              className={`${amiri.className} hidden md:inline-block bg-[#D4AF37] hover:bg-[#b5952f] text-[#0B3B60] px-6 py-2.5 rounded-full text-lg font-bold transition-all shadow-md hover:shadow-lg`}
            >
              ابدأ براندك الآن
            </Link>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown (القائمة اللي كتهبط فالتليفون) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl z-40">
          <nav className={`${amiri.className} flex flex-col px-6 pt-4 pb-8 space-y-4`}>
            <Link href="/" onClick={toggleMenu} className="block text-lg font-bold text-[#0B3B60] hover:text-[#D4AF37] transition-colors">الرئيسية</Link>
            <Link href="/products" onClick={toggleMenu} className="block text-lg font-bold text-[#0B3B60] hover:text-[#D4AF37] transition-colors">المنتجات الطبية</Link>
            <Link href="/about" onClick={toggleMenu} className="block text-lg font-bold text-[#0B3B60] hover:text-[#D4AF37] transition-colors">مختبراتنا</Link>
            <Link href="/wholesale" onClick={toggleMenu} className="block text-lg font-bold text-[#0B3B60] hover:text-[#D4AF37] transition-colors">برنامج الشراكة</Link>
            <Link href="/contact" onClick={toggleMenu} className="block text-lg font-bold text-[#0B3B60] hover:text-[#D4AF37] transition-colors">تواصل معنا</Link>
            
            <div className="pt-4 border-t border-gray-100">
              <Link href="/wholesale" onClick={toggleMenu} className="block w-full text-center bg-[#D4AF37] text-[#0B3B60] px-5 py-3.5 rounded-full font-bold shadow-md hover:bg-[#b5952f] transition-colors text-lg">
                ابدأ براندك الآن
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}