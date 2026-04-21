"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/lib/i18n/context";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  const { t, isRTL } = useLanguage();
  const p = t.products;

  const { id, name, description, price, minOrder, image } = product;
  const displayTitle = name || "—";
  const displayPrice = price || 0;
  const displayMoq = minOrder || 1;

  const [qty, setQty] = useState(displayMoq);
  const [added, setAdded] = useState(false);

  const displayDescription = typeof description === "string" ? description : "";
  const imageUrl = image || "/placeholder-product.jpg";

  const handleAdd = () => {
    addToCart({ id, title: displayTitle, price: displayPrice, quantity: qty, moq: displayMoq });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
    setQty(displayMoq);
  };

  const dir = isRTL ? "rtl" : "ltr";

  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">

      {/* صورة */}
      <Link href={`/product/${id}`} className="relative bg-gray-50 overflow-hidden">
        <div className="relative h-44 sm:h-56 md:h-64 flex items-center justify-center p-4">
          <img
            src={imageUrl}
            alt={displayTitle}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        {displayMoq > 1 && (
          <span className="absolute top-3 left-3 bg-[#0a3b33] text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full">
            {p.moq}: {displayMoq}
          </span>
        )}
      </Link>

      {/* تفاصيل */}
      <div className="p-3 sm:p-4 flex flex-col grow" dir={dir}>
        <Link href={`/product/${id}`}>
          <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug line-clamp-2 hover:text-[#0a3b33] transition-colors mb-1">
            {displayTitle}
          </h3>
        </Link>
        {displayDescription && (
          <p className="text-[11px] sm:text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">
            {displayDescription}
          </p>
        )}

        <div className="mt-auto space-y-3">
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-xl font-extrabold text-[#0a3b33]">{displayPrice}</span>
            <span className="text-xs text-gray-400">{p.unit}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50 h-9 grow">
              <button
                onClick={() => setQty((q: number) => q + 1)}
                className="w-9 h-full flex items-center justify-center text-gray-600 hover:bg-[#0a3b33]/5 hover:text-[#0a3b33] transition-colors font-bold text-base"
              >+</button>
              <span className="grow text-center text-sm font-bold text-gray-800">{qty}</span>
              <button
                onClick={() => setQty((q: number) => Math.max(displayMoq, q - 1))}
                disabled={qty <= displayMoq}
                className="w-9 h-full flex items-center justify-center text-gray-600 hover:bg-[#0a3b33]/5 hover:text-[#0a3b33] transition-colors font-bold text-base disabled:opacity-30 disabled:cursor-not-allowed"
              >−</button>
            </div>

            <button
              onClick={handleAdd}
              className={`h-9 px-3 sm:px-4 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-1.5 shrink-0 shadow-sm ${
                added ? "bg-green-500 text-white scale-95" : "bg-[#0a3b33] hover:bg-[#156b5a] text-white"
              }`}
            >
              {added ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="hidden sm:inline">{p.added}</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                  <span className="hidden sm:inline">{p.add}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
