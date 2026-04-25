"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/lib/i18n/context";
import { Amiri } from "next/font/google";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

function Stars({ count = 4.5 }: { count?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${i <= Math.floor(count) ? "text-orange-400" : i - 0.5 <= count ? "text-orange-300" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export default function CatalogCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  const { t, isRTL } = useLanguage();
  const p = t.products;

  const { id, name, price, minOrder, image } = product;
  const displayTitle  = name     || "—";
  const displayPrice  = price    || 0;
  const displayMoq    = minOrder || 1;
  const imageUrl      = image    || "/placeholder-product.jpg";
  const dir           = isRTL ? "rtl" : "ltr";

  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({ id, title: displayTitle, price: displayPrice, quantity: displayMoq, moq: displayMoq });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  /* rating décoratif stable basé sur l'id */
  const seed  = id ? id.charCodeAt(0) % 3 : 0;
  const stars = [4.5, 4.7, 4.8][seed];
  const sales = ["+1,000", "+3,000", "+6,000", "+12,000"][seed * 2 % 4];
  const badge = seed === 1;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col" dir={dir}>

      {/* ── صورة المنتج ── */}
      <div className="relative w-full aspect-square bg-[#f7f7f7] overflow-hidden">
        <img
          src={imageUrl}
          alt={displayTitle}
          className="w-full h-full object-contain mix-blend-multiply p-3 hover:scale-105 transition-transform duration-500"
        />
        {/* شارة صغيرة على الصورة */}
        <div className="absolute top-2 right-2 bg-white/90 text-[#0a3b33] text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm border border-gray-100">
          INCIA
        </div>
      </div>

      {/* ── معلومات المنتج ── */}
      <div className="flex flex-col flex-1 px-2.5 pt-2 pb-2 gap-1">

        {/* الاسم */}
        <p className={`${amiri.className} text-[13px] font-bold text-gray-800 line-clamp-2 leading-snug`}>
          {displayTitle}
        </p>

        {/* النجوم + المبيعات */}
        <div className="flex items-center gap-1.5">
          <Stars count={stars} />
          <span className="text-[10px] text-gray-400 font-medium">{sales}</span>
        </div>

        {/* شارة شريك موثوق */}
        {badge && (
          <div className="flex items-center gap-1 w-fit">
            <span className="text-purple-600 text-[9px]">⭐</span>
            <span className={`${amiri.className} text-[10px] text-purple-700 font-bold bg-purple-50 border border-purple-200 px-1.5 py-0.5 rounded-sm`}>
              {isRTL ? "شريك موثوق" : "Top Seller"}
            </span>
          </div>
        )}

        {/* شريط MOQ */}
        {displayMoq > 1 && (
          <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded px-2 py-1">
            <span className={`${amiri.className} text-orange-700 text-[10px] font-bold`}>
              {p.moq}: {displayMoq}
            </span>
            <span className="text-orange-400 text-[9px] font-bold tracking-wider">B2B</span>
          </div>
        )}

        {/* ── السعر + زر السلة ── */}
        <div className="flex items-end justify-between mt-auto pt-1">
          <div className="flex flex-col leading-none">
            <span className={`${amiri.className} text-[10px] text-orange-500 font-bold`}>
              {isRTL ? "سعر الجملة" : "Prix gros"}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-orange-500 text-xl font-extrabold leading-none">{displayPrice}</span>
              <span className={`${amiri.className} text-gray-400 text-[11px]`}>{isRTL ? "درهم" : "MAD"}</span>
            </div>
          </div>

          {/* زر السلة */}
          <button
            onClick={handleAdd}
            className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-200 shrink-0 ${
              added
                ? "bg-green-500 border-green-500 text-white"
                : "border-[#0a3b33] text-[#0a3b33] hover:bg-[#0a3b33] hover:text-white"
            }`}
          >
            {added ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
