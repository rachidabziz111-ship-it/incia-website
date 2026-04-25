"use client";

import Link from "next/link";
import { Amiri } from "next/font/google";
import { useLanguage } from "@/lib/i18n/context";
import Header from "@/components/Header";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

export default function WholesalePage() {
  const { t, isRTL } = useLanguage();
  const w   = t.wholesale;
  const dir = isRTL ? "rtl" : "ltr";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8f9fa]" dir={dir}>

        {/* ════════════════════════════════════════
            HERO — full dark teal, gold accents
        ════════════════════════════════════════ */}
        <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#071e1a]">

          {/* خلفية نقطية ذهبية */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, #C8A96E 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

          {/* دوائر ضوئية */}
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#C8A96E]/8 blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#0a3b33]/60 blur-[100px] pointer-events-none" />

          {/* خط علوي ذهبي */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-[#C8A96E] to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
            <div className="max-w-4xl">

              {/* eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[1px] bg-[#C8A96E]" />
                <span className={`${amiri.className} text-[#C8A96E] text-sm font-bold tracking-[0.25em] uppercase`}>
                  {w.hero.eyebrow}
                </span>
              </div>

              {/* headline */}
              <h1 className={`${amiri.className} text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6`}>
                {w.hero.headline}
                <br />
                <span className="text-[#C8A96E] relative inline-block">
                  {w.hero.accent}
                  <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-[#C8A96E]/40 rounded-full" />
                </span>
              </h1>

              <p className={`${amiri.className} text-white/60 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl`}>
                {w.hero.sub}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className={`${amiri.className} bg-[#C8A96E] hover:bg-[#a8893e] text-white font-bold px-8 py-4 rounded-full text-base md:text-lg transition-all shadow-[0_0_30px_rgba(200,169,110,0.3)] hover:shadow-[0_0_50px_rgba(200,169,110,0.5)] active:scale-95`}
                >
                  {w.hero.cta1}
                </Link>
                <Link
                  href="/products"
                  className={`${amiri.className} border border-white/20 text-white hover:border-[#C8A96E] hover:text-[#C8A96E] font-bold px-8 py-4 rounded-full text-base md:text-lg transition-all`}
                >
                  {w.hero.cta2}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            STATS BAR
        ════════════════════════════════════════ */}
        <section className="bg-[#0a3b33] border-y border-[#C8A96E]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-x-reverse divide-[#C8A96E]/15">
              {w.stats.map((s) => (
                <div key={s.label} className="py-8 px-6 text-center">
                  <div className={`${amiri.className} text-3xl md:text-4xl font-bold text-[#C8A96E]`}>{s.num}</div>
                  <div className={`${amiri.className} text-white/50 text-sm mt-1`}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            TWO PATHS
        ════════════════════════════════════════ */}
        <section className="py-24 bg-[#f8f9fa]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-10 bg-[#C8A96E]" />
                <span className={`${amiri.className} text-[#C8A96E] text-xs tracking-[0.3em] uppercase font-bold`}>{w.paths.eyebrow}</span>
                <div className="h-px w-10 bg-[#C8A96E]" />
              </div>
              <h2 className={`${amiri.className} text-3xl md:text-5xl font-bold text-[#0a3b33]`}>{w.paths.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Wholesale Card */}
              <div className="group bg-white rounded-3xl border border-gray-100 hover:border-[#0a3b33]/20 shadow-sm hover:shadow-xl transition-all duration-400 overflow-hidden flex flex-col">
                <div className="bg-[#f0f9f6] px-8 pt-8 pb-6 border-b border-gray-100">
                  <span className={`${amiri.className} text-[#0a3b33] text-[11px] font-bold tracking-widest uppercase bg-[#0a3b33]/8 px-3 py-1 rounded-full`}>
                    {w.paths.wholesale.tag}
                  </span>
                  <h3 className={`${amiri.className} text-3xl font-bold text-[#0a3b33] mt-4`}>{w.paths.wholesale.title}</h3>
                  <p className={`${amiri.className} text-gray-500 mt-2 leading-relaxed`}>{w.paths.wholesale.desc}</p>
                </div>
                <div className="px-8 py-6 flex-1 flex flex-col">
                  <ul className="space-y-3 flex-1">
                    {w.paths.wholesale.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#0a3b33]/8 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-[#0a3b33]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className={`${amiri.className} text-gray-700`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/products"
                    className={`${amiri.className} mt-8 block text-center border-2 border-[#0a3b33] text-[#0a3b33] hover:bg-[#0a3b33] hover:text-white font-bold px-6 py-3.5 rounded-2xl transition-all duration-300`}
                  >
                    {w.paths.wholesale.cta}
                  </Link>
                </div>
              </div>

              {/* Private Label Card — gold premium */}
              <div className="group relative bg-[#0a3b33] rounded-3xl border border-[#C8A96E]/20 shadow-xl hover:shadow-[0_20px_60px_rgba(10,59,51,0.25)] transition-all duration-400 overflow-hidden flex flex-col">

                {/* badge */}
                <div className="absolute top-6 left-6 z-10">
                  <span className={`${amiri.className} bg-[#C8A96E] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider`}>
                    {w.paths.privatLabel.badge}
                  </span>
                </div>

                {/* decorative glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8A96E]/10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />

                <div className="px-8 pt-12 pb-6 border-b border-white/10 relative z-10">
                  <span className={`${amiri.className} text-[#C8A96E] text-[11px] font-bold tracking-widest uppercase bg-[#C8A96E]/10 px-3 py-1 rounded-full`}>
                    {w.paths.privatLabel.tag}
                  </span>
                  <h3 className={`${amiri.className} text-3xl font-bold text-white mt-4`}>{w.paths.privatLabel.title}</h3>
                  <p className={`${amiri.className} text-white/60 mt-2 leading-relaxed`}>{w.paths.privatLabel.desc}</p>
                </div>
                <div className="px-8 py-6 flex-1 flex flex-col relative z-10">
                  <ul className="space-y-3 flex-1">
                    {w.paths.privatLabel.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#C8A96E]/20 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-[#C8A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className={`${amiri.className} text-white/80`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`${amiri.className} mt-8 block text-center bg-[#C8A96E] hover:bg-[#a8893e] text-white font-bold px-6 py-3.5 rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(200,169,110,0.3)]`}
                  >
                    {w.paths.privatLabel.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            STEPS — Private Label Journey
        ════════════════════════════════════════ */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-10 bg-[#C8A96E]" />
                <span className={`${amiri.className} text-[#C8A96E] text-xs tracking-[0.3em] uppercase font-bold`}>{w.steps.eyebrow}</span>
                <div className="h-px w-10 bg-[#C8A96E]" />
              </div>
              <h2 className={`${amiri.className} text-3xl md:text-5xl font-bold text-[#0a3b33]`}>{w.steps.title}</h2>
              <p className={`${amiri.className} mt-4 text-gray-500 max-w-xl mx-auto`}>{w.steps.sub}</p>
            </div>

            <div className="relative">
              {/* خط رابط */}
              <div className="hidden md:block absolute top-8 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-[#C8A96E]/30 to-transparent" />

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
                {w.steps.items.map((step, i) => (
                  <div key={step.num} className="relative flex flex-col items-center text-center group">
                    {/* رقم الخطوة */}
                    <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#0a3b33] group-hover:bg-[#C8A96E] transition-colors duration-300 flex items-center justify-center mb-5 shadow-lg">
                      <span className={`${amiri.className} text-white font-bold text-lg`}>{step.num}</span>
                    </div>
                    {/* connector dot */}
                    {i < w.steps.items.length - 1 && (
                      <div className="hidden md:block absolute top-8 right-0 w-3 h-3 rounded-full bg-[#C8A96E]/40 translate-x-1/2 -translate-y-1/2 z-20" />
                    )}
                    <h4 className={`${amiri.className} text-base font-bold text-[#0a3b33] mb-2`}>{step.title}</h4>
                    <p className={`${amiri.className} text-gray-400 text-sm leading-relaxed`}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            WHY INCIA — 6 advantages grid
        ════════════════════════════════════════ */}
        <section className="py-24 bg-[#f8f9fa]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-10 bg-[#C8A96E]" />
                <span className={`${amiri.className} text-[#C8A96E] text-xs tracking-[0.3em] uppercase font-bold`}>{w.why.eyebrow}</span>
                <div className="h-px w-10 bg-[#C8A96E]" />
              </div>
              <h2 className={`${amiri.className} text-3xl md:text-5xl font-bold text-[#0a3b33]`}>{w.why.title}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {w.why.items.map(({ icon, title, desc }) => (
                <div key={title} className="group bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#C8A96E]/30 hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl mb-4">{icon}</div>
                  <h4 className={`${amiri.className} text-lg font-bold text-[#0a3b33] mb-2`}>{title}</h4>
                  <p className={`${amiri.className} text-gray-500 text-sm leading-relaxed`}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            CTA FINAL
        ════════════════════════════════════════ */}
        <section className="py-20 bg-[#0a3b33]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

            <div className="relative rounded-3xl border border-[#C8A96E]/20 bg-white/5 p-12 md:p-16 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-[#C8A96E] to-transparent" />
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#C8A96E]/8 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-px w-10 bg-[#C8A96E]/50" />
                  <span className={`${amiri.className} text-[#C8A96E] text-xs tracking-[0.3em] uppercase font-bold`}>{w.cta.eyebrow}</span>
                  <div className="h-px w-10 bg-[#C8A96E]/50" />
                </div>

                <h2 className={`${amiri.className} text-3xl md:text-4xl font-bold text-white mb-4`}>{w.cta.title}</h2>
                <p className={`${amiri.className} text-white/50 text-lg mb-10`}>{w.cta.sub}</p>

                <Link
                  href="/contact"
                  className={`${amiri.className} inline-flex flex-col items-center gap-1`}
                >
                  <span className="bg-[#C8A96E] hover:bg-white text-white hover:text-[#0a3b33] font-bold text-lg px-12 py-4 rounded-full transition-all shadow-[0_0_30px_rgba(200,169,110,0.35)] hover:shadow-[0_0_50px_rgba(200,169,110,0.5)] active:scale-95">
                    {w.cta.btn}
                  </span>
                  <span className={`${amiri.className} text-white/30 text-xs mt-2`}>{w.cta.btnSub}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
