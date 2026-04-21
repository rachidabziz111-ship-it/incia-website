"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Amiri } from "next/font/google";
import { createClient } from "next-sanity";
import { useLanguage } from "@/lib/i18n/context";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-03-09",
  useCdn: false,
});

export default function ClinicPage() {
  const { t, isRTL } = useLanguage();
  const c = t.clinic;
  const dir = isRTL ? "rtl" : "ltr";

  const [products,        setProducts]        = useState<any[]>([]);
  const [agents,          setAgents]          = useState<any[]>([]);
  const [searchQuery,     setSearchQuery]     = useState("");
  const [activeCategory,  setActiveCategory]  = useState("all");
  const [isModalOpen,     setIsModalOpen]     = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isLoading,       setIsLoading]       = useState(true);
  const [scrolled,        setScrolled]        = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, agentsData] = await Promise.all([
          client.fetch(
            `*[_type == "product" && targetMarket in ["clinic", "both"]] | order(_createdAt desc) {
              _id, name, price, "image": image.asset->url, description, treatmentType
            }`,
            {},
            { cache: "no-store" }
          ),
          client.fetch(
            `*[_type == "employee"] | order(_createdAt asc) {
              _id, name, role, whatsapp, "imageUrl": image.asset->url
            }`,
            {},
            { cache: "no-store" }
          ),
        ]);
        setProducts(productsData || []);
        setAgents(agentsData || []);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOpenModal = (name = "") => {
    setSelectedProduct(name);
    setIsModalOpen(true);
  };

  const sendToWhatsApp = (number: string) => {
    const clean = number.replace(/[^0-9]/g, "");
    const text  = selectedProduct
      ? `${c.modal.whatsappMsg} ${selectedProduct}`
      : c.modal.whatsappGeneral;
    setIsModalOpen(false);
    window.open(`https://wa.me/${clean}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const renderPrice = (price: any) => {
    if (!price) return c.card.priceDefault;
    return !isNaN(Number(price))
      ? `${price} ${isRTL ? "درهم" : "MAD"}`
      : price;
  };

  const filteredProducts = products.filter((p: any) => {
    const matchCat  = activeCategory === "all" || p.treatmentType === activeCategory;
    const term      = searchQuery.toLowerCase();
    const matchSrch = !searchQuery || [p.name, p.description].some((s) => s?.toLowerCase().includes(term));
    return matchCat && matchSrch;
  });

  const groupedProducts = filteredProducts.reduce((acc: any, p: any) => {
    const key = p.treatmentType || "daily";
    (acc[key] = acc[key] || []).push(p);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-[#0c0c0c] selection:bg-[#D4AF37] selection:text-black" dir={dir}>

      {/* ── Animations ── */}
      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(${isRTL ? "-100%" : "100vw"}); }
          100% { transform: translateX(${isRTL ? "100vw" : "-100%"}); }
        }
        .marquee-run { display:inline-block; white-space:nowrap; animation: marqueeScroll 30s linear infinite; }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up   { animation: fadeUp .9s ease both; }
        .fade-up-2 { animation: fadeUp 1.1s .15s ease both; }
        .fade-up-3 { animation: fadeUp 1.2s .3s ease both; }
      `}</style>

      {/* ════════════════════════════════════════
          HEADER
      ════════════════════════════════════════ */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/95 backdrop-blur shadow-[0_2px_30px_rgba(212,175,55,0.12)]" : "bg-black"} border-b border-[#D4AF37]/20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24" dir={dir}>

            {/* روابط يسار / يمين حسب الاتجاه */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className={`${amiri.className} text-sm text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors tracking-wide`}>
                {c.backToIncia}
              </Link>
              <a href="#treatments" className={`${amiri.className} text-base text-white/80 hover:text-[#D4AF37] transition-colors font-bold`}>
                {c.treatmentsNav}
              </a>
            </div>

            {/* اللوغو */}
            <Link href="/clinic" className="flex items-center gap-3 group mx-auto md:mx-0">
              <div className="relative w-12 h-12 md:w-16 md:h-16 transition-transform group-hover:scale-105">
                <Image src="/lovelife-logo.png" alt="Love Life" fill className="object-contain" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-2xl md:text-3xl font-bold text-[#D4AF37] tracking-[0.2em]" dir="ltr">
                  LOVE LIFE
                </span>
                <span className={`${amiri.className} text-[10px] text-white/50 tracking-[0.3em] text-center mt-0.5`}>
                  CLINIC & CARE
                </span>
              </div>
            </Link>

            {/* يمين: حجز + تبديل اللغة */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <button
                onClick={() => handleOpenModal()}
                className={`${amiri.className} bg-[#D4AF37] text-black font-bold text-sm md:text-base px-5 md:px-7 py-2.5 rounded-full transition-all hover:shadow-[0_0_24px_rgba(212,175,55,0.5)] hover:bg-white active:scale-95`}
              >
                {c.bookBtn}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/hero-lovelife.jpg" alt="Love Life Clinic" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/65" />
          <div className={`absolute inset-0 bg-linear-to-${isRTL ? "l" : "r"} from-black/80 via-black/30 to-transparent`} />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-[#0c0c0c] to-transparent" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-[#D4AF37] to-transparent z-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
          <div className="max-w-3xl">

            <div className="fade-up flex items-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-[#D4AF37]" />
              <span className={`${amiri.className} text-[#D4AF37] text-sm md:text-base font-bold tracking-[0.2em] uppercase`}>
                {c.hero.eyebrow}
              </span>
            </div>

            <h1 className={`${amiri.className} fade-up-2 text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4`}>
              {isRTL ? (
                <>
                  عيادة{" "}
                  <span className="text-[#D4AF37] relative inline-block">
                    Love Life
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#D4AF37]/40" />
                  </span>
                </>
              ) : (
                <span className="text-[#D4AF37] relative inline-block">
                  Love Life
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#D4AF37]/40" />
                </span>
              )}
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-white/80 font-light">{c.hero.sub}</span>
            </h1>

            <p className={`${amiri.className} fade-up-3 text-base md:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl`}>
              {c.hero.desc}
            </p>

            <div className="fade-up-3 flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleOpenModal()}
                className={`${amiri.className} bg-[#D4AF37] text-black font-bold px-8 py-3.5 rounded-full text-base md:text-lg transition-all hover:bg-white hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] active:scale-95`}
              >
                {c.hero.cta1}
              </button>
              <a
                href="#treatments"
                className={`${amiri.className} border border-white/30 text-white font-bold px-8 py-3.5 rounded-full text-base md:text-lg transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]`}
              >
                {c.hero.cta2}
              </a>
            </div>

            {/* Stats */}
            <div className="fade-up-3 mt-14 grid grid-cols-3 gap-6 max-w-lg">
              {c.hero.stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className={`${amiri.className} text-2xl md:text-3xl font-bold text-[#D4AF37]`}>{s.num}</div>
                  <div className={`${amiri.className} text-xs text-white/50 mt-1`}>{s.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          MARQUEE
      ════════════════════════════════════════ */}
      <div className="overflow-hidden bg-[#D4AF37] border-y border-[#b8962a] py-3">
        <div className="marquee-run">
          <span className={`${amiri.className} text-black font-bold text-base md:text-lg mx-6`}>
            {c.marquee} {c.marquee}
          </span>
        </div>
      </div>

      {/* ════════════════════════════════════════
          TREATMENTS CATALOG
      ════════════════════════════════════════ */}
      <section id="treatments" className="py-16 md:py-24 bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-[#D4AF37]/50" />
              <span className={`${amiri.className} text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-bold`}>{c.catalog.eyebrow}</span>
              <div className="h-px w-12 bg-[#D4AF37]/50" />
            </div>
            <h2 className={`${amiri.className} text-3xl md:text-5xl font-bold text-white mb-4`}>
              {c.catalog.title} <span className="text-[#D4AF37]">{c.catalog.titleAccent}</span>
            </h2>

            {/* بحث */}
            <div className="max-w-xl mx-auto relative mt-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={c.catalog.searchPlaceholder}
                className={`${amiri.className} w-full px-6 py-3.5 ${isRTL ? "pr-12" : "pl-12"} rounded-full bg-white/5 border border-white/10 focus:border-[#D4AF37] outline-none text-white placeholder-white/30 text-base transition-all`}
                dir={dir}
              />
              <span className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-[#D4AF37]`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>

            {/* فلاتر */}
            {!searchQuery && (
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-8">
                {c.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`${amiri.className} flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${
                      activeCategory === cat.id
                        ? "bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.35)] scale-105"
                        : "bg-white/5 text-white/60 border border-white/10 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                    }`}
                  >
                    <span className="text-xs">{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* المنتجات */}
          {isLoading ? (
            <div className="flex justify-center py-24">
              <div className="w-10 h-10 border-4 border-white/10 rounded-full border-t-[#D4AF37] animate-spin" />
            </div>
          ) : searchQuery ? (
            filteredProducts.length > 0 ? (
              <ProductGroup
                title={`${c.searchLabel} "${searchQuery}"`}
                products={filteredProducts}
                onBook={handleOpenModal}
                cardLabel={c.card.bookBtn}
                defaultDesc={c.card.defaultDesc}
                renderPrice={renderPrice}
                amiriClass={amiri.className}
              />
            ) : (
              <EmptyState text={c.empty} amiriClass={amiri.className} />
            )
          ) : Object.keys(groupedProducts).length > 0 ? (
            Object.keys(groupedProducts).map((type) => (
              <ProductGroup
                key={type}
                title={c.treatmentTitles[type as keyof typeof c.treatmentTitles] || c.treatmentTitles.daily}
                products={groupedProducts[type]}
                onBook={handleOpenModal}
                cardLabel={c.card.bookBtn}
                defaultDesc={c.card.defaultDesc}
                renderPrice={renderPrice}
                amiriClass={amiri.className}
              />
            ))
          ) : (
            <EmptyState text={c.emptySection} amiriClass={amiri.className} />
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA
      ════════════════════════════════════════ */}
      <section className="py-16 bg-[#0c0c0c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/25 bg-[#111] p-10 md:p-16 text-center shadow-[0_0_60px_rgba(212,175,55,0.08)]">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-[#D4AF37] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#D4AF37]/5 blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-10 bg-[#D4AF37]/50" />
                <span className={`${amiri.className} text-[#D4AF37] text-xs tracking-[0.3em] uppercase font-bold`}>{c.cta.eyebrow}</span>
                <div className="h-px w-10 bg-[#D4AF37]/50" />
              </div>
              <h2 className={`${amiri.className} text-3xl md:text-4xl font-bold text-white mb-4`}>
                {c.cta.title} <span className="text-[#D4AF37]">{c.cta.titleAccent}</span>
              </h2>
              <p className={`${amiri.className} text-white/60 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed`}>
                {c.cta.desc}
              </p>
              <button
                onClick={() => handleOpenModal()}
                className={`${amiri.className} bg-[#D4AF37] text-black hover:bg-white font-bold text-lg px-10 py-4 rounded-full transition-all shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] active:scale-95`}
              >
                {c.cta.btn}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHATSAPP MODAL
      ════════════════════════════════════════ */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
        >
          <div className="bg-[#111] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-[#D4AF37]/25" dir={dir}>
            <div className="relative bg-[#0e0e0e] border-b border-[#D4AF37]/20 p-5 flex items-center justify-between">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-[#D4AF37] to-transparent" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#D4AF37]">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                  </svg>
                </div>
                <h3 className={`${amiri.className} font-bold text-white text-lg`}>{c.modal.title}</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white text-2xl leading-none transition-colors">✕</button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <p className={`${amiri.className} text-white/40 text-sm text-center mb-6`}>{c.modal.subtitle}</p>
              <div className="space-y-3">
                {agents.length > 0 ? (
                  agents.map((agent) => (
                    <button
                      key={agent._id}
                      onClick={() => sendToWhatsApp(agent.whatsapp)}
                      className="w-full flex items-center p-3.5 bg-white/5 border border-white/10 rounded-xl hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 transition-all group text-right"
                    >
                      <div className={`w-12 h-12 rounded-full overflow-hidden shrink-0 ${isRTL ? "ml-4" : "mr-4"} bg-white/10 flex items-center justify-center`}>
                        {agent.imageUrl
                          ? <img src={agent.imageUrl} alt={agent.name} className="w-full h-full object-cover" />
                          : <span className="text-white/30 text-xl">👤</span>
                        }
                      </div>
                      <div className="flex-1 text-right">
                        <h4 className={`${amiri.className} font-bold text-white group-hover:text-[#D4AF37] transition-colors text-base`}>{agent.name}</h4>
                        <p className={`${amiri.className} text-white/40 text-sm mt-0.5`}>{agent.role || c.modal.defaultRole}</p>
                      </div>
                      <div className={`text-[#25D366] opacity-50 group-hover:opacity-100 transition-opacity ${isRTL ? "mr-2" : "ml-2"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`}>
                          <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                        </svg>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className={`${amiri.className} text-white/30 text-center py-6`}>{c.loading}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* ─── Sub-components ─── */

function ProductGroup({
  title, products, onBook, cardLabel, defaultDesc, renderPrice, amiriClass,
}: {
  title: string; products: any[]; onBook: (n: string) => void;
  cardLabel: string; defaultDesc: string; renderPrice: (p: any) => string; amiriClass: string;
}) {
  return (
    <div className="mb-16 last:mb-0">
      <div className="flex items-center gap-4 mb-8 border-b border-white/8 pb-4">
        <div className="w-1.5 h-7 rounded-full bg-[#D4AF37]" />
        <h3 className={`${amiriClass} text-xl md:text-2xl font-bold text-white`}>{title}</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product: any) => (
          <TreatmentCard key={product._id} product={product} onBook={onBook} cardLabel={cardLabel} defaultDesc={defaultDesc} renderPrice={renderPrice} amiriClass={amiriClass} />
        ))}
      </div>
    </div>
  );
}

function TreatmentCard({
  product, onBook, cardLabel, defaultDesc, renderPrice, amiriClass,
}: {
  product: any; onBook: (n: string) => void;
  cardLabel: string; defaultDesc: string; renderPrice: (p: any) => string; amiriClass: string;
}) {
  return (
    <div className="group bg-[#141414] border border-white/8 rounded-2xl overflow-hidden flex flex-col hover:border-[#D4AF37]/40 hover:shadow-[0_4px_30px_rgba(212,175,55,0.12)] transition-all duration-300">
      <div className="relative w-full aspect-square bg-[#1a1a1a] overflow-hidden">
        {product.image ? (
          <Image src={product.image} alt={product.name} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" unoptimized />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/10 text-4xl">✦</div>
        )}
        <div className="absolute top-2 right-2 bg-black/80 border border-[#D4AF37]/40 text-[#D4AF37] px-2 py-0.5 text-[9px] font-bold tracking-widest rounded-md">
          LOVE LIFE
        </div>
      </div>
      <div className="flex flex-col flex-1 p-4">
        <h4 className={`${amiriClass} text-sm sm:text-base font-bold text-white mb-1.5 line-clamp-2 leading-snug`}>{product.name}</h4>
        <p className={`${amiriClass} text-white/40 text-xs sm:text-sm line-clamp-2 flex-1 leading-relaxed`}>
          {product.description || defaultDesc}
        </p>
        <div className="mt-4 pt-3 border-t border-white/8 flex flex-col gap-2">
          <span className={`${amiriClass} text-[#D4AF37] text-base sm:text-lg font-bold text-center`}>
            {renderPrice(product.price)}
          </span>
          <button
            onClick={() => onBook(product.name)}
            className={`${amiriClass} bg-white/5 hover:bg-[#D4AF37] hover:text-black text-white/70 border border-white/10 hover:border-[#D4AF37] py-2 rounded-xl text-sm font-bold transition-all duration-300`}
          >
            {cardLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ text, amiriClass }: { text: string; amiriClass: string }) {
  return (
    <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
      <div className="text-[#D4AF37]/20 text-6xl mb-4">✦</div>
      <p className={`${amiriClass} text-white/30 text-lg`}>{text}</p>
    </div>
  );
}
