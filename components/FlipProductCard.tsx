"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/lib/i18n/context";

export default function FlipProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  const { t, isRTL } = useLanguage();
  const p = t.products;

  const { id, name, description, price, minOrder, image } = product;
  const displayTitle = name || "—";
  const displayPrice = price || 0;
  const displayMoq = minOrder || 1;

  const [qty, setQty] = useState(displayMoq);
  const [added, setAdded] = useState(false);

  const imageUrl = image || "/placeholder-product.jpg";
  const dir = isRTL ? "rtl" : "ltr";

  const handleAdd = () => {
    addToCart({ id, title: displayTitle, price: displayPrice, quantity: qty, moq: displayMoq });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
    setQty(displayMoq);
  };

  return (
    <>
      <style>{`
        .flip-card { perspective: 1000px; }
        .flip-inner {
          transition: transform 0.65s cubic-bezier(.4,0,.2,1);
          transform-style: preserve-3d;
          position: relative;
        }
        .flip-card:hover .flip-inner { transform: rotateY(180deg); }
        .flip-front, .flip-back {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .flip-back { transform: rotateY(180deg); }
      `}</style>

      <div className="flip-card shrink-0 w-52 sm:w-60 md:w-64 h-80 sm:h-96 cursor-pointer">
        <div className="flip-inner w-full h-full">

          {/* ── الواجهة الأمامية ── */}
          <div className="flip-front absolute inset-0 rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-white">
            {/* الصورة */}
            <div className="w-full h-full relative">
              <img
                src={imageUrl}
                alt={displayTitle}
                className="w-full h-full object-contain mix-blend-multiply p-6"
              />
              {/* gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-[#0a3b33]/80 via-transparent to-transparent" />
              {/* اسم المنتج */}
              <div className="absolute bottom-0 left-0 right-0 p-4" dir={dir}>
                <p className="text-white font-bold text-sm sm:text-base line-clamp-2 drop-shadow">
                  {displayTitle}
                </p>
                <p className="text-[#C8A96E] text-xs mt-1 font-medium">
                  {displayPrice} {isRTL ? "درهم" : "MAD"}
                </p>
              </div>
            </div>
          </div>

          {/* ── الواجهة الخلفية ── */}
          <div className="flip-back absolute inset-0 rounded-2xl overflow-hidden shadow-xl bg-[#0a3b33] border border-[#1a5c4a] flex flex-col p-5" dir={dir}>
            {/* اسم المنتج */}
            <Link href={`/product/${id}`}>
              <h3 className="text-white font-bold text-sm sm:text-base line-clamp-2 leading-snug hover:text-[#C8A96E] transition-colors">
                {displayTitle}
              </h3>
            </Link>

            {/* السعر */}
            <div className="mt-3 mb-auto">
              <span className="text-[#C8A96E] text-2xl font-extrabold">{displayPrice}</span>
              <span className="text-white/50 text-xs ml-1">{p.unit}</span>
            </div>

            {/* MOQ */}
            {displayMoq > 1 && (
              <div className="text-white/50 text-xs mb-3">
                {p.moq}: {displayMoq}
              </div>
            )}

            {/* الكمية */}
            <div className="flex items-center border border-white/20 rounded-xl overflow-hidden bg-white/10 h-9 mb-3">
              <button
                onClick={() => setQty((q: number) => q + 1)}
                className="w-9 h-full flex items-center justify-center text-white hover:bg-white/20 transition-colors font-bold"
              >+</button>
              <span className="grow text-center text-sm font-bold text-white">{qty}</span>
              <button
                onClick={() => setQty((q: number) => Math.max(displayMoq, q - 1))}
                disabled={qty <= displayMoq}
                className="w-9 h-full flex items-center justify-center text-white hover:bg-white/20 transition-colors font-bold disabled:opacity-30"
              >−</button>
            </div>

            {/* زر الإضافة */}
            <button
              onClick={handleAdd}
              className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                added
                  ? "bg-green-500 text-white"
                  : "bg-[#C8A96E] hover:bg-[#a8893e] text-white"
              }`}
            >
              {added ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {p.added}
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                  {p.add}
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
