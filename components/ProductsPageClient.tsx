"use client";

import Link from "next/link";
import { Amiri } from "next/font/google";
import { useLanguage } from "@/lib/i18n/context";
import FlipProductCard from "@/components/FlipProductCard";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

// ── صف بأنيماسيون لانهائي ──
function AutoRow({ products, direction }: { products: any[]; direction: "left" | "right" }) {
  const doubled = [...products, ...products, ...products];
  const animName = direction === "left" ? "slideLeft" : "slideRight";
  return (
    <div className="overflow-hidden w-full">
      <style>{`
        @keyframes slideLeft  { from { transform: translateX(0); }    to { transform: translateX(-33.333%); } }
        @keyframes slideRight { from { transform: translateX(-33.333%); } to { transform: translateX(0); } }
        .auto-row { display: flex; gap: 16px; width: max-content; }
        .auto-row-left  { animation: slideLeft  28s linear infinite; }
        .auto-row-right { animation: slideRight 28s linear infinite; }
        .auto-row:hover { animation-play-state: paused; }
      `}</style>
      <div className={`auto-row auto-row-${direction} py-3`}>
        {doubled.map((product, i) => (
          <div key={`${product.id}-${i}`} className="shrink-0">
            <FlipProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 3 صفوف بأنيماسيون متعاكس ──
function ThreeRows({ products }: { products: any[] }) {
  if (products.length === 0) return null;
  const rows = [
    products.filter((_: any, i: number) => i % 3 === 0),
    products.filter((_: any, i: number) => i % 3 === 1),
    products.filter((_: any, i: number) => i % 3 === 2),
  ].map((row) => (row.length > 0 ? row : products));

  return (
    <div className="flex flex-col gap-4">
      <AutoRow products={rows[0]} direction="left"  />
      <AutoRow products={rows[1]} direction="right" />
      <AutoRow products={rows[2]} direction="left"  />
    </div>
  );
}

export default function ProductsPageClient({ products }: { products: any[] }) {
  const { t, isRTL } = useLanguage();
  const p = t.products;
  const dir = isRTL ? "rtl" : "ltr";

  return (
    <main className="min-h-screen bg-[#f8f9fa] pb-24">

      {/* ── شريط علوي ── */}
      <div className="bg-[#0a3b33] text-white text-center py-2 px-4 text-[11px] tracking-wider font-medium">
        {p.announcement}
      </div>

      {/* ── هيدر الكاتالوج sticky ── */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16" dir={dir}>
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-500 hover:text-[#0a3b33] transition-colors text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d={isRTL ? "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" : "M13.5 19.5L21 12m0 0l-7.5-7.5M21 12H3"} />
              </svg>
              <span className="hidden sm:inline">{p.backHome}</span>
            </Link>

            <div className="text-center">
              <span className={`${amiri.className} text-lg sm:text-xl font-bold text-[#0a3b33] tracking-wide`}>
                INCIA <span className="text-[#C8A96E]">Medical</span>
              </span>
              <div className="text-[10px] text-gray-400 tracking-widest uppercase hidden sm:block">Catalogue Professionnel</div>
            </div>

            <div className={`${amiri.className} text-xs text-gray-400 font-medium`}>
              {products.length} {p.count}
            </div>
          </div>
        </div>
      </div>

      {/* ── عنوان القسم ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4" dir={dir}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`${amiri.className} text-2xl sm:text-3xl font-bold text-gray-900`}>{p.title}</h1>
            <p className={`${amiri.className} text-gray-500 text-sm mt-1`}>{p.sub}</p>
          </div>
          <div className="hidden sm:block h-10 w-1 bg-linear-to-b from-[#C8A96E] to-[#0a3b33] rounded-full" />
        </div>
        <div className="mt-4 border-t border-gray-200" />
      </div>

      {/* ── شبكة المنتجات ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        {products.length > 0 ? (
          <ThreeRows products={products} />
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center max-w-xl mx-auto mt-12" dir={dir}>
            <div className="w-16 h-16 bg-[#0a3b33]/5 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#0a3b33]/40">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <h3 className={`${amiri.className} text-xl font-bold text-gray-800 mb-2`}>{p.empty.title}</h3>
            <p className={`${amiri.className} text-gray-400 text-sm`}>{p.empty.sub}</p>
          </div>
        )}
      </section>

      {/* ── بانر الجملة ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="relative overflow-hidden bg-linear-to-br from-[#0a3b33] to-[#0d4a3e] rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8A96E]/10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6" dir={dir}>
            <div>
              <div className="text-[#C8A96E] text-xs font-bold tracking-widest uppercase mb-2">{p.wholesale.tag}</div>
              <h3 className={`${amiri.className} text-2xl sm:text-3xl font-bold text-white mb-2`}>{p.wholesale.title}</h3>
              <p className={`${amiri.className} text-[#f0f9f6]/70 text-sm sm:text-base`}>{p.wholesale.sub}</p>
            </div>
            <Link
              href="/wholesale"
              className={`${amiri.className} shrink-0 bg-[#C8A96E] hover:bg-[#a8893e] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap text-sm`}
            >
              {p.wholesale.cta}
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
