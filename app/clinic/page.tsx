"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Amiri } from "next/font/google"; 
import { createClient } from "next-sanity";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

// 1. إعداد الاتصال مع Sanity
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-03-09",
  useCdn: false,
});

export default function ClinicPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // 2. جلب البيانات من Sanity 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsQuery = `*[_type == "product" && targetMarket in ["clinic", "both"]] | order(_createdAt desc) {
          _id, name, price, "image": image.asset->url, description, treatmentType
        }`;
        
        const agentsQuery = `*[_type == "employee"] | order(_createdAt asc) {
          _id, name, role, whatsapp, "imageUrl": image.asset->url
        }`;

        const [productsData, agentsData] = await Promise.all([
          client.fetch(productsQuery, {}, { cache: 'no-store' }),
          client.fetch(agentsQuery, {}, { cache: 'no-store' })
        ]);

        setProducts(productsData || []);
        setAgents(agentsData || []); 
      } catch (error) {
        console.error("مشكل في جلب البيانات:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (productName: string = "") => {
    setSelectedProduct(productName);
    setIsModalOpen(true);
  };

  // 3. دالة الإرسال للواتساب
  const sendToWhatsApp = (whatsappNumber: string) => {
    const cleanPhone = whatsappNumber ? whatsappNumber.replace(/[^0-9]/g, '') : '';
    const text = selectedProduct 
      ? `مرحباً، بغيت نستفسر على علاج/منتج: ${selectedProduct}`
      : "مرحباً، بغيت نحجز موعد في عيادة Love Life.";
      
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    
    setIsModalOpen(false);
    window.open(whatsappUrl, "_blank");
  };

  // تصفية المنتجات حسب البحث
  const filteredProducts = products.filter((product: any) => {
    if (!searchQuery) return true;
    const term = searchQuery.toLowerCase();
    return (
      (product.name && product.name.toLowerCase().includes(term)) ||
      (product.description && product.description.toLowerCase().includes(term)) ||
      (product.treatmentType && product.treatmentType.toLowerCase().includes(term))
    );
  });

  const treatmentTitles: Record<string, string> = {
    'acne': 'علاجات حب الشباب والأمراض الجلدية',
    'pigmentation': 'علاجات التصبغات وتوحيد لون البشرة',
    'anti-aging': 'علاجات شد البشرة ومقاومة الشيخوخة',
    'hydration': 'علاجات النضارة والترطيب العميق',
    'daily': 'العناية الشاملة والروتين اليومي'
  };

  const groupedProducts = filteredProducts.reduce((acc: any, product: any) => {
    const type = product.treatmentType || 'daily';
    if (!acc[type]) acc[type] = [];
    acc[type].push(product);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-white selection:bg-[#D4AF37] selection:text-black" dir="rtl">
      
      {/* ستايل الشريط المتحرك - تم تغيير الاتجاه هنا */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollMarquee {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: scrollMarquee 25s linear infinite;
        }
      `}} />

      {/* ---------- Header ---------- */}
      <header className="bg-black text-white sticky top-0 z-40 border-b border-[#D4AF37]/40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-28">
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className={`${amiri.className} text-sm font-bold text-gray-300 hover:text-[#D4AF37] transition-colors`}>
                الرجوع لـ INCIA
              </Link>
              <a href="#treatments" className={`${amiri.className} text-lg font-bold text-white hover:text-[#D4AF37] transition-colors`}>
                العلاجات المتاحة
              </a>
            </div>

            <div className="flex-shrink-0 flex justify-center items-center">
              <Link href="/clinic" className="relative flex items-center gap-3 group">
                <div className="relative w-14 h-14 md:w-20 md:h-20 transition-transform group-hover:scale-105">
                  <Image src="/lovelife-logo.png" alt="Love Life Logo" fill className="object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl md:text-3xl font-bold text-[#D4AF37] tracking-widest leading-none" dir="ltr">
                    LOVE LIFE
                  </span>
                  <span className={`${amiri.className} text-[10px] md:text-xs text-white tracking-widest text-center mt-1`}>
                    CLINIC & CARE
                  </span>
                </div>
              </Link>
            </div>

            <div className="flex items-center">
              <button onClick={() => handleOpenModal()} className={`${amiri.className} bg-[#D4AF37] text-black hover:bg-white px-4 py-2 md:px-6 md:py-2 rounded-full text-sm md:text-base font-bold transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] flex items-center justify-center`}>
                إحجز موعدك
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ---------- Hero Section ---------- */}
      <section className="relative py-16 md:py-32 flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          <Image src="/hero-lovelife.jpg" alt="Love Life Clinic" fill className="object-cover opacity-80" priority />
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-transparent z-10"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full flex flex-col items-start text-right">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
            <span className={`${amiri.className} text-[#D4AF37] text-sm md:text-lg font-bold tracking-wider`}>
              الرعاية الصحية المتكاملة
            </span>
          </div>
          <h1 className={`${amiri.className} text-4xl md:text-6xl font-bold text-white leading-tight mb-4 max-w-3xl drop-shadow-lg`}>
            عيادة <span className="text-[#D4AF37]">Love Life</span> <br /> 
            لجميع العلاجات الطبية الكلاسيكية
          </h1>
          <p className={`${amiri.className} text-base md:text-xl text-gray-200 font-light max-w-2xl leading-relaxed mb-8 drop-shadow-md`}>
            نقدم لك رعاية صحية وطبية شاملة تتجاوز التجميل. نعتمد على أحدث التقنيات والبروتوكولات العلاجية لضمان صحتك وجمالك الداخلي والخارجي.
          </p>
        </div>
      </section>

      {/* ---------- الإضافة 1: الشريط المتحرك تحت الهيرو (بدون إيموجي) ---------- */}
      <div className="bg-[#D4AF37] py-2 overflow-hidden border-b border-gray-200 w-full relative z-30 flex items-center">
        <div className="animate-marquee whitespace-nowrap">
          <span className={`${amiri.className} text-black font-bold text-base md:text-lg mx-6`}>
            عناية طبية متقدمة • بروتوكولات علاجية آمنة وفعالة • خبراء وأطباء رهن إشارتك • حجز المواعيد متاح الآن •
          </span>
          <span className={`${amiri.className} text-black font-bold text-base md:text-lg mx-6`}>
            عناية طبية متقدمة • بروتوكولات علاجية آمنة وفعالة • خبراء وأطباء رهن إشارتك • حجز المواعيد متاح الآن •
          </span>
          <span className={`${amiri.className} text-black font-bold text-base md:text-lg mx-6`}>
            عناية طبية متقدمة • بروتوكولات علاجية آمنة وفعالة • خبراء وأطباء رهن إشارتك • حجز المواعيد متاح الآن •
          </span>
        </div>
      </div>

      {/* ---------- Treatments Section ---------- */}
      <section id="treatments" className="py-12 md:py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className={`${amiri.className} text-3xl md:text-4xl font-bold text-black mb-3`}>
              بروتوكولات <span className="text-[#D4AF37]">العلاج</span>
            </h2>
            
            <div className="max-w-2xl mx-auto relative mt-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن منتج (مثال: باك قبول...)"
                className={`${amiri.className} w-full px-6 py-3 pr-12 rounded-full border border-gray-200 focus:border-[#D4AF37] outline-none text-base transition-all text-black shadow-sm`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-gray-200 rounded-full border-t-[#D4AF37] animate-spin"></div>
            </div>
          ) : 
          /* ---------- الإضافة 2: إصلاح عرض البحث (إظهار النتيجة مباشرة) ---------- */
          searchQuery ? (
            filteredProducts.length > 0 ? (
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-2">
                  <div className="w-2 h-6 bg-[#D4AF37]"></div>
                  <h3 className={`${amiri.className} text-xl md:text-2xl font-bold text-black`}>
                    نتائج البحث عن: "{searchQuery}"
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
                  {filteredProducts.map((product: any) => (
                    <div key={product._id} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:border-[#D4AF37]/50 hover:shadow-md transition-all duration-300 group flex flex-col h-full">
                      <div className="relative w-full aspect-square mb-3 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-2">
                        {product.image && (
                          <Image src={product.image} alt={product.name} fill className="object-contain group-hover:scale-105 transition-transform duration-500" unoptimized />
                        )}
                      </div>
                      <div className="flex-grow flex flex-col">
                        <h4 className={`${amiri.className} text-sm sm:text-base font-bold text-black mb-1 line-clamp-2`}>{product.name}</h4>
                        <p className={`${amiri.className} text-gray-500 text-xs sm:text-sm line-clamp-2 flex-grow`}>
                          {product.description || 'علاج طبي متخصص لضمان أفضل النتائج.'}
                        </p>
                        <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-3">
                          <span className={`${amiri.className} text-base sm:text-lg font-bold text-[#D4AF37] text-center`}>
                            {product.price ? `${product.price} درهم` : 'حسب الاستشارة'}
                          </span>
                          <button 
                            onClick={() => handleOpenModal(product.name)}
                            className={`${amiri.className} bg-black hover:bg-[#D4AF37] text-white py-2 rounded-lg text-sm font-medium transition-colors text-center w-full shadow-sm`}
                          >
                            طلب العلاج
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className={`${amiri.className} text-center py-16 text-lg text-gray-500 bg-white rounded-2xl border border-dashed border-gray-200 shadow-sm`}>
                لا توجد علاجات مطابقة لبحثك.
              </div>
            )
          ) : (
            /* العرض العادي بالأقسام يلا ماكانش كيبحث */
            Object.keys(groupedProducts).length > 0 ? (
              Object.keys(groupedProducts).map((type) => (
                <div key={type} className="mb-16 last:mb-0">
                  <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-2">
                    <div className="w-2 h-6 bg-[#D4AF37]"></div>
                    <h3 className={`${amiri.className} text-xl md:text-2xl font-bold text-black`}>
                      {treatmentTitles[type] || 'علاجات عامة'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
                    {groupedProducts[type].map((product: any) => (
                      <div key={product._id} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:border-[#D4AF37]/50 hover:shadow-md transition-all duration-300 group flex flex-col h-full">
                        
                        <div className="relative w-full aspect-square mb-3 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-2">
                          {product.image && (
                            <Image src={product.image} alt={product.name} fill className="object-contain group-hover:scale-105 transition-transform duration-500" unoptimized />
                          )}
                          <div className="absolute top-2 right-2 bg-black text-[#D4AF37] px-2 py-0.5 text-[10px] font-bold tracking-widest rounded shadow-sm">
                            LOVE LIFE
                          </div>
                        </div>
                        
                        <div className="flex-grow flex flex-col">
                          <h4 className={`${amiri.className} text-sm sm:text-base font-bold text-black mb-1 line-clamp-2`}>{product.name}</h4>
                          <p className={`${amiri.className} text-gray-500 text-xs sm:text-sm line-clamp-2 flex-grow`}>
                            {product.description || 'علاج طبي متخصص لضمان أفضل النتائج.'}
                          </p>
                          
                          <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-3">
                            <span className={`${amiri.className} text-base sm:text-lg font-bold text-[#D4AF37] text-center`}>
                              {product.price ? `${product.price} درهم` : 'حسب الاستشارة'}
                            </span>
                            <button 
                              onClick={() => handleOpenModal(product.name)}
                              className={`${amiri.className} bg-black hover:bg-[#D4AF37] text-white py-2 rounded-lg text-sm font-medium transition-colors text-center w-full shadow-sm`}
                            >
                              طلب العلاج
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className={`${amiri.className} text-center py-16 text-lg text-gray-500 bg-white rounded-2xl border border-dashed border-gray-200 shadow-sm`}>
                لا توجد علاجات حالياً.
              </div>
            )
          )}
        </div>
      </section>

      {/* ---------- الإضافة 3: بطاقة علاجات مختارة بعناية في الأسفل ---------- */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black rounded-3xl p-8 md:p-12 text-center shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-[#D4AF37]/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
            <h2 className={`${amiri.className} text-3xl md:text-4xl font-bold text-white mb-4`}>علاجات مختارة بعناية خصيصاً لك</h2>
            <p className={`${amiri.className} text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed`}>
              فريقنا الطبي مستعد لتقديم أفضل الحلول والعلاجات التي تناسب احتياجاتك بدقة. لا تتردد في استشارتنا اليوم للحصول على تشخيص دقيق وخطة علاجية متكاملة.
            </p>
            <button onClick={() => handleOpenModal()} className={`${amiri.className} bg-[#D4AF37] text-black hover:bg-white px-8 py-3 rounded-full text-lg font-bold transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] inline-flex items-center gap-2`}>
              احجز استشارتك الآن
            </button>
          </div>
        </div>
      </section>

      {/* ---------- WhatsApp Modal ---------- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-[#D4AF37]/30" dir="rtl">
            
            <div className="bg-black text-white p-5 flex justify-between items-center border-b border-[#D4AF37]">
              <h3 className={`${amiri.className} font-bold text-xl`}>تواصل معنا عبر واتساب</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white text-3xl leading-none">
                &times;
              </button>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <p className="text-gray-600 mb-6 text-sm text-center">
                المرجو اختيار القسم المناسب لإرسال طلبك:
              </p>
              
              <div className="space-y-3">
                {agents.length > 0 ? agents.map((agent) => (
                  <button
                    key={agent._id}
                    onClick={() => sendToWhatsApp(agent.whatsapp)}
                    className="w-full flex items-center p-3 border border-gray-200 rounded-xl hover:bg-[#D4AF37]/5 hover:border-[#D4AF37] transition-all group text-right"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ml-4 group-hover:scale-105 transition-transform bg-gray-100 flex items-center justify-center">
                       {agent.imageUrl ? (
                         <img src={agent.imageUrl} alt={agent.name} className="w-full h-full object-cover" />
                       ) : (
                         <span className="text-gray-400 text-2xl">👤</span>
                       )}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-lg group-hover:text-black transition-colors">{agent.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{agent.role || 'خدمة العملاء'}</p>
                    </div>

                    <div className="text-[#25D366] opacity-70 group-hover:opacity-100 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" className="transform rotate-180">
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                      </svg>
                    </div>
                  </button>
                )) : (
                  <div className="text-center text-gray-500 py-4">جاري تحميل الأرقام...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}