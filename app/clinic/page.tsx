"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Amiri } from "next/font/google";
import { createClient } from "next-sanity";
import Header from "@/components/Header";
import { useLanguage } from "@/lib/i18n/context";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-03-09",
  useCdn: false,
});

const CATEGORIES = [
  { id: "all",               icon: "✦", label: "جميع العلاجات" },
  { id: "skin_care",         icon: "✿", label: "العناية بالبشرة والوجه" },
  { id: "body_intimate",     icon: "◈", label: "الجسم والمناطق الأنثوية" },
  { id: "health_digestion",  icon: "❧", label: "الصحة والهضم" },
  { id: "weight_fitness",    icon: "◉", label: "الرشاقة والوزن" },
  { id: "hair_teeth_perfume",icon: "✾", label: "الشعر والأسنان" },
];

const TREATMENT_TITLES: Record<string, string> = {
  skin_care:          "العناية بالبشرة والوجه",
  body_intimate:      "العناية بالجسم والمناطق الأنثوية",
  health_digestion:   "الصحة، الهضم والمفاصل",
  weight_fitness:     "الرشاقة والوزن",
  hair_teeth_perfume: "الشعر والأسنان والعطور",
  daily:              "علاجات عامة",
};

const STATS = [
  { num: "+60",  label: "بروتوكول علاجي" },
  { num: "+12",  label: "سنة خبرة" },
  { num: "100%", label: "مكونات معتمدة" },
  { num: "6",    label: "اعتمادات دولية" },
];

export default function ClinicPage() {
  const { isRTL } = useLanguage();
  const dir = isRTL ? "rtl" : "ltr";

  const [products,       setProducts]       = useState<any[]>([]);
  const [agents,         setAgents]         = useState<any[]>([]);
  const [searchQuery,    setSearchQuery]    = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isModalOpen,    setIsModalOpen]    = useState(false);
  const [selectedProduct,setSelectedProduct]= useState("");
  const [isLoading,      setIsLoading]      = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [p, a] = await Promise.all([
          client.fetch(
            `*[_type=="product" && targetMarket in ["clinic","both"]] | order(_createdAt desc){
              _id, name, price, "image": image.asset->url, description, treatmentType
            }`,
            {}, { cache: "no-store" }
          ),
          client.fetch(
            `*[_type=="employee"] | order(_createdAt asc){
              _id, name, role, whatsapp, "imageUrl": image.asset->url
            }`,
            {}, { cache: "no-store" }
          ),
        ]);
        setProducts(p || []);
        setAgents(a || []);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const openModal = (name = "") => { setSelectedProduct(name); setIsModalOpen(true); };

  const sendWhatsApp = (num: string) => {
    const clean = num.replace(/[^0-9]/g, "");
    const text  = selectedProduct
      ? `مرحباً، أودّ الاستفسار عن: ${selectedProduct}`
      : "مرحباً، أودّ حجز موعد في عيادة INCIA.";
    window.open(`https://wa.me/${clean}?text=${encodeURIComponent(text)}`, "_blank");
    setIsModalOpen(false);
  };

  const renderPrice = (price: any) => {
    if (!price) return "حسب الاستشارة";
    return isNaN(Number(price)) ? price : `${price} درهم`;
  };

  const filtered = products.filter((p: any) => {
    const matchCat  = activeCategory === "all" || p.treatmentType === activeCategory;
    const term      = searchQuery.toLowerCase();
    const matchSrch = !searchQuery ||
      p.name?.toLowerCase().includes(term) ||
      p.description?.toLowerCase().includes(term);
    return matchCat && matchSrch;
  });

  const grouped = filtered.reduce((acc: any, p: any) => {
    const key = p.treatmentType || "daily";
    if (!acc[key]) acc[key] = [];
    acc[key].push(p);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-[#f8f9fa] selection:bg-[#C8A96E] selection:text-[#0a3b33]" dir="rtl">

      <style>{`
        @keyframes marqueeClinic {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        .clinic-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marqueeClinic 30s linear infinite;
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        .fade-up { animation: fadeUp .6s ease both; }
      `}</style>

      {/* ── الهيدر المشترك ── */}
      <Header />

      {/* ── Hero ── */}
      <section className="relative h-[85vh] min-h-[560px] overflow-hidden">
        {/* صورة الخلفية */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1920&q=90')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        {/* overlay تيل داكن */}
        <div className="absolute inset-0 bg-[#0a3b33]/75" />
        {/* خط ذهبي */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#C8A96E] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#C8A96E]/40 to-transparent" />

        {/* محتوى الهيرو */}
        <div className="relative z-10 h-full flex items-center" dir="rtl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl fade-up">

              {/* eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#C8A96E]" />
                <span className="text-[#C8A96E] text-xs tracking-[0.35em] uppercase font-bold">
                  INCIA Medical Clinic
                </span>
              </div>

              <h1 className={`${amiri.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight`}>
                كتالوج العلاجات
                <br />
                <span className="text-[#C8A96E]">الطبية العالمية</span>
              </h1>

              <p className={`${amiri.className} mt-7 text-base md:text-lg text-white/75 leading-relaxed max-w-2xl font-light`}>
                بروتوكولات علاجية حصرية مستوحاة من أعرق العيادات العالمية — نقدمها لك بأيدي خبراء معتمدين وبأعلى معايير الجودة الصيدلانية.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={() => openModal()}
                  className={`${amiri.className} bg-[#C8A96E] hover:bg-[#a8893e] text-white px-9 py-4 rounded-full font-bold text-base md:text-lg transition-all shadow-lg hover:shadow-xl`}
                >
                  احجز موعدك الآن
                </button>
                <a
                  href="#treatments"
                  className={`${amiri.className} bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white px-9 py-4 rounded-full font-bold text-base md:text-lg transition-all`}
                >
                  استكشف العلاجات
                </a>
              </div>

              {/* إحصاءات */}
              <div className="mt-14 flex flex-wrap gap-x-10 gap-y-4">
                {STATS.map(({ num, label }) => (
                  <div key={label}>
                    <div className={`${amiri.className} text-2xl font-extrabold text-[#C8A96E]`}>{num}</div>
                    <div className={`${amiri.className} text-xs text-white/50 mt-0.5`}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── شريط متحرك ── */}
      <div className="bg-[#0a3b33] py-3.5 overflow-hidden border-y border-[#1a5c4a]">
        <div className="clinic-marquee">
          <span className={`${amiri.className} text-white text-sm md:text-base font-bold px-4`}>
            <span className="text-[#C8A96E] mx-4">✦</span>
            بروتوكولات علاجية معتمدة دولياً
            <span className="text-[#C8A96E] mx-4">✦</span>
            علاجات بشرة وجسم بمعايير عيادات باريس ولندن
            <span className="text-[#C8A96E] mx-4">✦</span>
            حجز المواعيد متاح الآن عبر واتساب
            <span className="text-[#C8A96E] mx-4">✦</span>
            مكونات صيدلانية خالية من المواد الضارة
            <span className="text-[#C8A96E] mx-4">✦</span>
          </span>
        </div>
      </div>

      {/* ── كتالوج العلاجات ── */}
      <section id="treatments" className="py-16 md:py-24 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* العنوان + البحث */}
          <div className="text-center mb-12" dir="rtl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#C8A96E]" />
              <span className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase font-bold">كتالوج العيادة</span>
              <div className="h-px w-10 bg-[#C8A96E]" />
            </div>
            <h2 className={`${amiri.className} text-3xl md:text-5xl font-bold text-[#0a3b33] mb-8`}>
              بروتوكولات <span className="text-[#C8A96E]">العلاج</span>
            </h2>

            {/* مربع البحث */}
            <div className="max-w-xl mx-auto relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن علاج..."
                className={`${amiri.className} w-full px-6 py-3.5 pr-12 rounded-full border border-gray-200 focus:border-[#0a3b33] focus:ring-2 focus:ring-[#0a3b33]/10 outline-none text-base transition-all bg-white shadow-sm text-gray-900`}
                dir="rtl"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0a3b33]/40">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>

            {/* فلاتر الأقسام */}
            {!searchQuery && (
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-7">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`${amiri.className} px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                      activeCategory === cat.id
                        ? "bg-[#0a3b33] text-white shadow-md"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-[#0a3b33] hover:text-[#0a3b33]"
                    }`}
                  >
                    <span className={activeCategory === cat.id ? "text-[#C8A96E]" : "text-[#C8A96E]/70"}>
                      {cat.icon}
                    </span>
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* المحتوى */}
          {isLoading ? (
            <div className="flex justify-center py-24">
              <div className="w-10 h-10 border-4 border-gray-100 rounded-full border-t-[#0a3b33] animate-spin" />
            </div>
          ) : searchQuery ? (
            /* نتائج البحث */
            filtered.length > 0 ? (
              <div dir="rtl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-7 bg-[#C8A96E] rounded-full" />
                  <h3 className={`${amiri.className} text-xl font-bold text-[#0a3b33]`}>
                    نتائج: "{searchQuery}"
                  </h3>
                </div>
                <TreatmentGrid products={filtered} onBook={openModal} renderPrice={renderPrice} amiri={amiri.className} />
              </div>
            ) : (
              <EmptyState amiri={amiri.className} />
            )
          ) : Object.keys(grouped).length > 0 ? (
            /* الأقسام المجمعة */
            Object.keys(grouped).map((type) => (
              <div key={type} className="mb-20 last:mb-0" dir="rtl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1 h-8 bg-[#C8A96E] rounded-full" />
                  <h3 className={`${amiri.className} text-2xl md:text-3xl font-bold text-[#0a3b33]`}>
                    {TREATMENT_TITLES[type] || "علاجات عامة"}
                  </h3>
                  <div className="flex-1 h-px bg-gray-200 hidden sm:block" />
                  <span className="text-sm text-gray-400 font-medium">{grouped[type].length} علاج</span>
                </div>
                <TreatmentGrid products={grouped[type]} onBook={openModal} renderPrice={renderPrice} amiri={amiri.className} />
              </div>
            ))
          ) : (
            <EmptyState amiri={amiri.className} />
          )}
        </div>
      </section>

      {/* ── CTA السفلي ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-[#0a3b33] rounded-3xl p-10 md:p-16 text-center shadow-xl" dir="rtl">
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#C8A96E]/60 to-transparent" />
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-[#C8A96E]/5 rounded-full pointer-events-none" />
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/3 rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-px w-10 bg-[#C8A96E]/50" />
                <span className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase font-bold">استشارة مجانية</span>
                <div className="h-px w-10 bg-[#C8A96E]/50" />
              </div>
              <h2 className={`${amiri.className} text-3xl md:text-5xl font-bold text-white mb-5`}>
                علاج مختار بعناية خصيصاً لك
              </h2>
              <p className={`${amiri.className} text-white/65 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed`}>
                فريقنا الطبي مستعد لتقديم أفضل الحلول التي تناسب احتياجاتك بدقة. تشخيص دقيق وخطة علاجية متكاملة.
              </p>
              <button
                onClick={() => openModal()}
                className={`${amiri.className} bg-[#C8A96E] hover:bg-[#a8893e] text-white px-10 py-4 rounded-full text-lg font-bold transition-all shadow-lg hover:shadow-xl`}
              >
                احجز استشارتك الآن
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── WhatsApp Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" dir="rtl">
            <div className="bg-[#0a3b33] text-white p-5 flex justify-between items-center">
              <div>
                <h3 className={`${amiri.className} font-bold text-lg`}>تواصل معنا عبر واتساب</h3>
                {selectedProduct && (
                  <p className={`${amiri.className} text-[#C8A96E] text-sm mt-0.5`}>بخصوص: {selectedProduct}</p>
                )}
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-5 max-h-[60vh] overflow-y-auto">
              <p className={`${amiri.className} text-gray-500 text-sm text-center mb-5`}>
                اختر القسم المناسب لإرسال طلبك:
              </p>
              <div className="space-y-3">
                {agents.length > 0 ? agents.map((agent) => (
                  <button
                    key={agent._id}
                    onClick={() => sendWhatsApp(agent.whatsapp)}
                    className="w-full flex items-center gap-4 p-3 border border-gray-100 rounded-xl hover:border-[#0a3b33]/30 hover:bg-[#0a3b33]/3 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-gray-100 flex items-center justify-center">
                      {agent.imageUrl
                        ? <img src={agent.imageUrl} alt={agent.name} className="w-full h-full object-cover" />
                        : <span className="text-2xl">👤</span>
                      }
                    </div>
                    <div className="flex-1 text-right">
                      <p className={`${amiri.className} font-bold text-[#0a3b33] group-hover:text-[#156b5a]`}>{agent.name}</p>
                      <p className={`${amiri.className} text-xs text-gray-400 mt-0.5`}>{agent.role || "خدمة العملاء"}</p>
                    </div>
                    <div className="text-[#25D366]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z"/>
                      </svg>
                    </div>
                  </button>
                )) : (
                  <p className={`${amiri.className} text-center text-gray-400 py-6`}>جاري التحميل...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}

// ── كارت العلاج ──────────────────────────────────────────
function TreatmentGrid({ products, onBook, renderPrice, amiri }: {
  products: any[];
  onBook: (name: string) => void;
  renderPrice: (p: any) => string;
  amiri: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
      {products.map((product: any, i: number) => (
        <TreatmentCard
          key={product._id}
          product={product}
          onBook={onBook}
          renderPrice={renderPrice}
          amiri={amiri}
          delay={i * 0.05}
        />
      ))}
    </div>
  );
}

function TreatmentCard({ product, onBook, renderPrice, amiri, delay }: {
  product: any;
  onBook: (name: string) => void;
  renderPrice: (p: any) => string;
  amiri: string;
  delay: number;
}) {
  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* صورة العلاج */}
      <div className="relative w-full aspect-square bg-[#f0f9f6] overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl text-[#0a3b33]/20">✿</span>
          </div>
        )}
        {/* badge INCIA */}
        <div className="absolute top-2 left-2 bg-[#0a3b33] text-[#C8A96E] px-2 py-0.5 text-[9px] font-bold tracking-widest rounded-full shadow-sm" dir="ltr">
          INCIA
        </div>
      </div>

      {/* تفاصيل */}
      <div className="p-3 md:p-4 flex flex-col grow" dir="rtl">
        <h4 className={`${amiri} text-sm sm:text-base font-bold text-gray-900 line-clamp-2 leading-snug mb-1`}>
          {product.name}
        </h4>
        <p className={`${amiri} text-xs text-gray-400 line-clamp-2 leading-relaxed grow`}>
          {product.description || "بروتوكول علاجي متخصص بأعلى معايير الجودة."}
        </p>

        {/* الخط الفاصل والسعر والزر */}
        <div className="mt-3 pt-3 border-t border-gray-50">
          <p className={`${amiri} text-base sm:text-lg font-extrabold text-[#0a3b33] text-center mb-2`}>
            {renderPrice(product.price)}
          </p>
          <button
            onClick={() => onBook(product.name)}
            className={`${amiri} w-full bg-[#0a3b33] hover:bg-[#C8A96E] text-white py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm`}
          >
            احجز هذا العلاج
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ amiri }: { amiri: string }) {
  return (
    <div className={`${amiri} text-center py-20 text-gray-400 text-lg bg-white rounded-2xl border-2 border-dashed border-gray-100`} dir="rtl">
      لا توجد علاجات في هذا القسم حالياً.
    </div>
  );
}
