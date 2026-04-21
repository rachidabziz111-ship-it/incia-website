"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Amiri } from "next/font/google";
import { useLanguage } from "@/lib/i18n/context";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);
  const dir = isRTL ? "rtl" : "ltr";

  return (
    <>
      {/* ── شريط الإعلان ── */}
      <div className="bg-[#0a3b33] text-white text-center py-2 px-4 text-[11px] tracking-wider font-medium">
        <span className="text-[#C8A96E]">✦</span>
        <span className={`${amiri.className} mx-3 text-sm`}>{t.announcement}</span>
        <span className="text-[#C8A96E]">✦</span>
      </div>

      {/* ── الهيدر الرئيسي ── */}
      <header
        dir={dir}
        className={`sticky top-0 z-50 bg-white border-b transition-all duration-300 ${
          scrolled ? "shadow-md border-gray-200" : "border-gray-100 shadow-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-[72px]">

            {/* ── الروابط (ديسكتوب) / هامبرغر (موبايل) ── */}
            <div className="flex items-center lg:w-5/12">
              <nav className={`${amiri.className} hidden lg:flex items-center gap-7`}>
                {[
                  { href: "/", label: t.nav.home },
                  { href: "/about", label: t.nav.lab },
                  { href: "/products", label: t.nav.catalog },
                  { href: "/contact", label: t.nav.contact },
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-[#0a3b33] hover:text-[#C8A96E] font-bold text-[15px] tracking-wide transition-colors relative group"
                  >
                    {label}
                    <span className="absolute -bottom-1 right-0 w-0 group-hover:w-full h-px bg-[#C8A96E] transition-all duration-300" />
                  </Link>
                ))}
              </nav>

              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden p-2 text-[#0a3b33] hover:text-[#C8A96E] transition-colors"
                aria-label="menu"
              >
                {open ? (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

            {/* ── اللوغو (الوسط) ── */}
            <Link
              href="/"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2.5 group"
            >
              <div className="relative w-11 h-11 transition-transform duration-300 group-hover:scale-105">
                <Image src="/logo.png" alt="INCIA" fill className="object-contain" />
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="font-serif text-[22px] font-bold text-[#0a3b33] tracking-[0.15em]" dir="ltr">
                  INCIA<span className="text-[#C8A96E] text-lg">®</span>
                </div>
                <div className="text-[8px] text-[#0a3b33]/40 tracking-[0.35em] uppercase font-semibold -mt-0.5" dir="ltr">
                  Medical Cosmetics
                </div>
              </div>
            </Link>

            {/* ── اليمين: مبدّل اللغة + زر الجملة (ديسكتوب) ── */}
            <div className="hidden lg:flex items-center justify-end lg:w-5/12 gap-4">
              <LanguageSwitcher />
              <Link
                href="/clinic"
                className={`${amiri.className} text-[#0a3b33]/60 hover:text-[#0a3b33] transition-colors text-sm font-bold border-b border-transparent hover:border-[#C8A96E] pb-px`}
              >
                {t.nav.clinic}
              </Link>
              <Link
                href="/wholesale"
                className={`${amiri.className} bg-[#0a3b33] hover:bg-[#156b5a] text-white px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all shadow-sm hover:shadow-md`}
              >
                {t.nav.startBrand}
              </Link>
            </div>

          </div>
        </div>

        {/* ── قائمة الموبايل ── */}
        {open && (
          <div className="lg:hidden absolute w-full bg-white border-t border-gray-100 shadow-2xl z-40">
            <nav className={`${amiri.className} flex flex-col px-6 py-5 gap-1`} dir={dir}>
              {[
                { href: "/", label: t.nav.home },
                { href: "/about", label: t.nav.lab },
                { href: "/products", label: t.nav.mobileWholesale },
                { href: "/contact", label: t.nav.contact },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={close}
                  className="text-[#0a3b33] font-bold text-lg py-3 border-b border-gray-50 hover:text-[#C8A96E] transition-colors"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/clinic"
                onClick={close}
                className="text-[#C8A96E] font-bold text-lg py-3 border-b border-gray-50"
              >
                ✦ {t.nav.mobileClinic}
              </Link>

              {/* مبدّل اللغة في الموبايل */}
              <div className="py-4 flex items-center gap-3">
                <span className="text-xs text-gray-400 font-medium">Language:</span>
                <LanguageSwitcher />
              </div>

              <Link
                href="/wholesale"
                onClick={close}
                className="block text-center bg-[#0a3b33] hover:bg-[#156b5a] text-white px-5 py-3.5 rounded-full font-bold text-lg transition-all mt-1"
              >
                {t.nav.mobileStart}
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
