"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Amiri } from "next/font/google";
import { useLanguage } from "@/lib/i18n/context";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

const IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1920&q=85",
    overlay: "bg-black/55",
  },
  {
    url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1920&q=85",
    overlay: "bg-[#0a3b33]/65",
  },
  {
    url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1920&q=85",
    overlay: "bg-black/60",
  },
];

export default function HeroSlider() {
  const { t, isRTL } = useLanguage();
  const slides = t.hero.slides;

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === current) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 400);
    },
    [animating, current]
  );

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo, slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];
  const img = IMAGES[current];
  const dir = isRTL ? "rtl" : "ltr";

  return (
    <section className="relative h-[92vh] min-h-[600px] max-h-[900px] overflow-hidden">

      {/* ── الصور ── */}
      {IMAGES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{
            backgroundImage: `url(${s.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 1 : 0,
          }}
        />
      ))}

      {/* ── overlay ── */}
      <div className={`absolute inset-0 z-10 transition-all duration-700 ${img.overlay}`} />

      {/* ── خط ذهبي سفلي ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#C8A96E] to-transparent z-20" />

      {/* ── المحتوى ── */}
      <div className="relative z-20 h-full flex items-center" dir={dir}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div
            className={`max-w-3xl transition-all duration-500 ${
              animating ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
            } ${isRTL ? "mr-0" : "ml-0"}`}
          >
            {/* eyebrow */}
            <div className={`flex items-center gap-3 mb-6 ${isRTL ? "" : "flex-row"}`}>
              <div className="h-px w-12 bg-[#C8A96E] shrink-0" />
              <span className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase font-bold">
                {slide.eyebrow}
              </span>
            </div>

            {/* العنوان */}
            <h1 className={`${amiri.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white drop-shadow-lg`}>
              {slide.headline}
              <br />
              <span className="text-[#C8A96E]">{slide.accent}</span>
            </h1>

            {/* الوصف */}
            <p className={`${amiri.className} mt-7 text-base md:text-lg text-white/80 leading-relaxed max-w-2xl font-light`}>
              {slide.sub}
            </p>

            {/* الأزرار */}
            <div className={`mt-10 flex flex-wrap gap-4`}>
              <Link
                href="/wholesale"
                className={`${amiri.className} bg-[#C8A96E] hover:bg-[#a8893e] text-white px-9 py-3.5 rounded-full font-bold text-base md:text-lg transition-all shadow-lg hover:shadow-xl`}
              >
                {t.hero.cta1}
              </Link>
              <Link
                href="/products"
                className={`${amiri.className} bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 hover:border-white/60 text-white px-9 py-3.5 rounded-full font-bold text-base md:text-lg transition-all`}
              >
                {t.hero.cta2}
              </Link>
            </div>

            {/* أرقام الثقة */}
            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              {t.hero.stats.map(({ num, label }) => (
                <div key={label}>
                  <div className={`${amiri.className} text-2xl font-bold text-[#C8A96E]`}>{num}</div>
                  <div className={`${amiri.className} text-xs text-white/50 mt-0.5`}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── نقاط التنقل ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "bg-[#C8A96E] w-8 h-2" : "bg-white/40 hover:bg-white/70 w-2 h-2"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── أسهم ── */}
      <button
        onClick={() => goTo((current - 1 + slides.length) % slides.length)}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
      <button
        onClick={() => goTo((current + 1) % slides.length)}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

    </section>
  );
}
