"use client";

import Image from "next/image";
import Link from "next/link";
import { Amiri } from "next/font/google";
import { useLanguage } from "@/lib/i18n/context";
import CatalogCard from "@/components/CatalogCard";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

const CERT_ICONS = [
  { name: "وزارة الصحة", src: "/moh.png" },
  { name: "ISO 22000", src: "/iso.png" },
  { name: "AMMPS", src: "/ammps.png" },
  { name: "ONSSA", src: "/onssa.png" },
  { name: "IMANOR", src: "/imanor.png" },
  { name: "FDA", src: "/fda.png" },
];

const VALUE_ICONS = [
  <svg key="a" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
  </svg>,
  <svg key="b" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>,
  <svg key="c" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>,
];

// ── Marquee ──────────────────────────────
function Marquee() {
  const { t } = useLanguage();
  return (
    <div className="overflow-hidden bg-[#0a3b33] border-y border-[#1a5c4a] py-4">
      <style>{`
        @keyframes scrollRight { 0%{transform:translateX(-100%)} 100%{transform:translateX(100vw)} }
        .marquee-track { display:inline-block; white-space:nowrap; animation:scrollRight 32s linear infinite; }
      `}</style>
      <div className="marquee-track">
        <span className={`${amiri.className} text-xl md:text-2xl font-bold text-white px-4`}>
          <span className="text-[#C8A96E] mx-4">✦</span>
          {t.marquee}
        </span>
      </div>
    </div>
  );
}

// ── Value Props ───────────────────────────
function ValueProps() {
  const { t, isRTL } = useLanguage();
  const dir = isRTL ? "rtl" : "ltr";
  return (
    <section className="py-20 bg-white px-4" dir={dir}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#C8A96E]" />
            <span className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase font-bold">{t.valueProps.eyebrow}</span>
            <div className="h-px w-10 bg-[#C8A96E]" />
          </div>
          <h2 className={`${amiri.className} text-3xl md:text-5xl font-bold text-[#0a3b33]`}>{t.valueProps.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.valueProps.items.map(({ title, desc }, i) => (
            <div key={title} className="group p-8 rounded-2xl border border-gray-100 hover:border-[#C8A96E]/30 bg-[#fafaf8] hover:bg-white shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-[#0a3b33]/5 group-hover:bg-[#0a3b33] flex items-center justify-center text-[#0a3b33] group-hover:text-white transition-all duration-300 mb-5">
                {VALUE_ICONS[i]}
              </div>
              <h3 className={`${amiri.className} text-xl font-bold text-[#0a3b33] mb-3`}>{title}</h3>
              <p className={`${amiri.className} text-gray-500 leading-relaxed`}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Featured Products ─────────────────────
function FeaturedProducts({ products }: { products: any[] }) {
  const { t, isRTL } = useLanguage();
  const dir = isRTL ? "rtl" : "ltr";
  return (
    <section className="py-28 bg-white" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#C8A96E]" />
            <span className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase font-bold">{t.featured.eyebrow}</span>
            <div className="h-px w-10 bg-[#C8A96E]" />
          </div>
          <h2 className={`${amiri.className} text-3xl md:text-5xl font-bold text-[#0a3b33]`}>{t.featured.title}</h2>
          <p className={`${amiri.className} mt-5 text-lg text-gray-500 max-w-2xl mx-auto font-light`}>{t.featured.sub}</p>
        </div>

        <div>
          {products && products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-4">
              {products.map((product: any) => (
                <CatalogCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className={`${amiri.className} col-span-full text-center text-gray-400 py-16 border-2 border-dashed border-gray-100 rounded-3xl text-lg`}>
              {t.featured.empty}
            </div>
          )}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/products"
            className={`${amiri.className} inline-flex items-center gap-3 border-2 border-[#0a3b33] text-[#0a3b33] hover:bg-[#0a3b33] hover:text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300`}
          >
            {t.featured.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Certifications ────────────────────────
function Certifications() {
  const { t, isRTL } = useLanguage();
  const dir = isRTL ? "rtl" : "ltr";
  return (
    <section className="py-24 bg-[#f8f9fa] border-y border-gray-100 overflow-hidden" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10 bg-[#C8A96E]" />
          <span className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase font-bold">{t.certs.eyebrow}</span>
          <div className="h-px w-10 bg-[#C8A96E]" />
        </div>
        <h2 className={`${amiri.className} text-3xl md:text-5xl font-bold text-[#0a3b33]`}>{t.certs.title}</h2>
        <p className={`${amiri.className} mt-4 text-lg text-gray-500 max-w-2xl mx-auto`}>{t.certs.sub}</p>
      </div>

      <style>{`
        @keyframes scrollLogos{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .logos-track{display:flex;width:200%;animation:scrollLogos 28s linear infinite;}
        .logos-track:hover{animation-play-state:paused;}
      `}</style>

      <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-[#f8f9fa] to-transparent z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-[#f8f9fa] to-transparent z-10" />
        <div className="logos-track items-center">
          {[...CERT_ICONS, ...CERT_ICONS].map((cert, i) => (
            <div key={i} className="flex-none w-44 md:w-56 mx-5 flex items-center justify-center">
              <div className="relative w-32 h-20 md:w-44 md:h-24 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center p-4 grayscale hover:grayscale-0 hover:shadow-md transition-all duration-500">
                <Image src={cert.src} alt={cert.name} fill className="object-contain p-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────
function Footer() {
  const { t, isRTL } = useLanguage();
  const dir = isRTL ? "rtl" : "ltr";
  return (
    <footer className="bg-[#0a3b33] text-white pt-16 pb-8" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-linear-to-r from-transparent via-[#C8A96E]/50 to-transparent mb-14" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="relative w-32 h-32 mb-4">
              <Image src="/logo.png" alt="INCIA" fill className="object-contain drop-shadow-md" />
            </div>
            <p className={`${amiri.className} text-[#f0f9f6]/70 text-sm leading-relaxed`}>{t.footer.desc}</p>
          </div>
          <div>
            <h4 className={`${amiri.className} font-bold mb-5 text-base text-[#C8A96E] tracking-wide`}>{t.footer.quickLinks}</h4>
            <ul className={`${amiri.className} space-y-3 text-sm text-[#f0f9f6]/70`}>
              {t.footer.links.map(({ href, label }) => (
                <li key={href}><Link href={href} className="hover:text-[#C8A96E] transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={`${amiri.className} font-bold mb-5 text-base text-[#C8A96E] tracking-wide`}>{t.footer.contact}</h4>
            <ul className={`${amiri.className} space-y-3 text-sm text-[#f0f9f6]/70`}>
              <li>partners@incia.com</li>
              <li>+212 5XX XXX XXX</li>
              <li>{isRTL ? "الدار البيضاء، المغرب" : "Casablanca, Morocco"}</li>
            </ul>
          </div>
          <div>
            <h4 className={`${amiri.className} font-bold mb-5 text-base text-[#C8A96E] tracking-wide`}>{t.footer.follow}</h4>
            <div className={`${amiri.className} flex flex-col gap-3 text-sm`}>
              {["LinkedIn", "Instagram", "WhatsApp"].map((s) => (
                <a key={s} href="#" className="text-[#f0f9f6]/70 hover:text-[#C8A96E] transition-colors w-fit">{s}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="h-px bg-[#1a5c4a] mt-12 mb-6" />
        <div className={`${amiri.className} flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#f0f9f6]/40`}>
          <span>© {new Date().getFullYear()} INCIA Medical — {t.footer.rights}</span>
          <span className="text-[#C8A96E]/60 tracking-widest">{t.footer.tagline} ✦</span>
        </div>
      </div>
    </footer>
  );
}

// ── Main Export ───────────────────────────
export default function HomeSections({ products }: { products: any[] }) {
  return (
    <>
      <Marquee />
      <ValueProps />
      <FeaturedProducts products={products} />
      <Certifications />
      <Footer />
    </>
  );
}
