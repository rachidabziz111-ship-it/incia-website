import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Amiri } from "next/font/google"; 
import { client } from '@/sanity/lib/client';
import Header from "@/components/Header";

// إعداد خط أميري لدعم اللغة العربية بلمسة كلاسيكية فاخرة
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

async function getProducts() {
  try {
    const query = `*[_type == "product"] | order(_createdAt desc) {
      "id": _id,
      name,
      price,
      minOrder,
      "image": image.asset->url,
      description
    }`;
    
    const products = await client.fetch(query);
    return products || [];
  } catch (error) {
    console.error("Error fetching products from Sanity:", error);
    return [];
  }
}

// ---------- Footer Component ----------
// تم تعديل الخلفية إلى لون "أزرق طبي" احترافي (Medical Blue)
function Footer() {
  return (
    <footer className="bg-[#0B3B60] text-white pt-16 pb-8 border-t border-[#082a45]" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-right">
          <div className="md:col-span-1 flex flex-col items-right">
            {/* اللوغو بدون خلفية */}
            <div className="relative w-40 h-40 mb-4 items-right justify-right flex">
              <Image 
                src="/logo.png" 
                alt="INCIA Laboratory Logo - Eagle and Microscope" 
                fill 
                className="object-contain drop-shadow-md" 
              />
            </div>
            <p className={`${amiri.className} text-blue-100 text-base leading-relaxed mt-2`}>
              شريكك الاستراتيجي لابتكار وتصنيع مستحضرات التجميل الطبية بمعايير صيدلانية عالمية.
            </p>
          </div>
          <div>
            <h4 className={`${amiri.className} font-bold mb-5 text-xl text-[#D4AF37]`}>روابط الوصول السريع</h4>
            <ul className="space-y-3.5 text-base text-blue-100">
              <li><Link href="/products" className="hover:text-[#D4AF37] transition-colors">كتالوج المنتجات</Link></li>
              <li><Link href="/wholesale" className="hover:text-[#D4AF37] transition-colors">ابدأ علامتك التجارية</Link></li>
              <li><Link href="/about" className="hover:text-[#D4AF37] transition-colors">من نحن</Link></li>
              <li><Link href="/contact" className="hover:text-[#D4AF37] transition-colors">طلب استشارة</Link></li>
            </ul>
          </div>
          <div>
            <h4 className={`${amiri.className} font-bold mb-5 text-xl text-[#D4AF37]`}>قنوات التواصل</h4>
            <ul className="space-y-3.5 text-base text-blue-100">
              <li dir="ltr" className="text-right">partners@incia.com</li>
              <li dir="ltr" className="text-right">+212 5XX XXX XXX</li>
              <li>الدار البيضاء، المغرب</li>
            </ul>
          </div>
          <div>
            <h4 className={`${amiri.className} font-bold mb-5 text-xl text-[#D4AF37]`}>تابع مسيرتنا</h4>
            <div className="flex space-x-4 space-x-reverse mt-2">
              <a href="#" className="text-blue-200 hover:text-[#D4AF37] transition-colors text-lg">LinkedIn</a>
              <a href="#" className="text-blue-200 hover:text-[#D4AF37] transition-colors text-lg">Instagram</a>
              <a href="#" className="text-blue-200 hover:text-[#D4AF37] transition-colors text-lg">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className={`${amiri.className} border-t border-[#0d4a7a] mt-12 pt-6 text-center text-sm text-blue-200`}>
          © {new Date().getFullYear()} مختبرات INCIA. ,جميع الحقوق محفوظة. نُصنّع نجاحك.
        </div>
      </div>
    </footer>
  );
}

// ---------- Hero Section ----------
// تم إزالة الظلام الزائد وإظهار الصورة بشكل أفضل
function Hero() {
  return (
    <section className="relative bg-slate-900 text-white pb-10" dir="rtl">
      {/* الصورة الخلفية الآن أكثر وضوحاً */}
      <div
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* طبقة شفافة خفيفة جداً فقط للحفاظ على وضوح النص */}
      <div className="absolute inset-0 bg-black/40 z-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-28 md:py-36 lg:py-44 text-right">
        <div className="max-w-4xl">
          <h1 className={`${amiri.className} text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-white drop-shadow-lg`}>
            حوّل شغفك إلى إمبراطورية تجميلية <br />
            <span className="text-[#D4AF37] drop-shadow-md">بلمسة صيدلانية موثوقة</span>
          </h1>
          <p className={`${amiri.className} mt-8 text-xl md:text-2xl text-gray-100 leading-relaxed font-light max-w-3xl drop-shadow-md`}>
            مختبرات INCIA تمنحك المفتاح: تركيبات طبية حصرية جاهزة للحمل اسمك. نحن نصنع الجودة، وأنت تصنع التاريخ. ابدأ براند أحلامك اليوم.
          </p>
          <div className="mt-12 flex flex-wrap gap-5">
            <Link
              href="/wholesale"
              className={`${amiri.className} bg-[#D4AF37] hover:bg-[#b5952f] text-gray-900 px-10 py-4 rounded-full font-bold text-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.5)]`}
            >
              ابدأ مشروع براندك الآن
            </Link>
            <Link
              href="/products"
              className={`${amiri.className} bg-white/10 backdrop-blur-sm border-2 border-white hover:bg-white hover:text-gray-900 text-white px-10 py-4 rounded-full font-bold text-xl transition-all`}
            >
              اكتشف قاعدة التركيبات
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Glass Marquee ----------
// لون طبي يتماشى مع الفوتر
function GlassMarquee() {
  return (
    <div className="relative z-20 -mt-12 mb-10 overflow-hidden">
      <style>{`
        @keyframes scrollRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        .animate-scroll-rtl {
          display: inline-block;
          white-space: nowrap;
          animation: scrollRight 30s linear infinite;
        }
      `}</style>
      
      <div className="w-full bg-[#0B3B60]/90 backdrop-blur-lg border-y border-[#0d4a7a] shadow-xl py-5">
        <div className="animate-scroll-rtl">
          <span className={`${amiri.className} text-2xl md:text-3xl font-bold text-white px-4`} dir="rtl">
            <span className="text-[#D4AF37] mx-5">✦</span>
            مختبرات INCIA: قوتنا العلمية.. نجاح لعلامتك التجارية
            <span className="text-[#D4AF37] mx-5">✦</span>
            ابتكار صيدلاني موثوق يُجسّد رؤيتك الخاصة
            <span className="text-[#D4AF37] mx-5">✦</span>
            من الفكرة إلى الرفوف: نصنع الجودة تحت اسمك
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------- Gold Card Section ----------
function GoldCardSection() {
  return (
    <section className="py-20 bg-white px-4">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center shadow-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#FFFDF2] via-[#FFF9E6] to-[#FFFDF2]">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center justify-center gap-8">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D4AF37" className="w-20 h-20 drop-shadow-xl">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
            <h2 className={`${amiri.className} text-4xl md:text-6xl font-bold text-[#8B6508] leading-tight drop-shadow-md`} dir="rtl">
              الجودة الصيدلانية هي أساس ثقة عملائك في براندك
            </h2>
            <p className={`${amiri.className} text-2xl text-[#8B6508]/90 font-medium max-w-3xl mt-4 leading-relaxed`} dir="rtl">
              لا تساوم على السمعة. مختبرات INCIA توفر لك تركيبات متطورة ومختبرة سريرياً، تضمن لعلامتك التجارية الجديدة التفوق والقبول الفوري في الأسواق المرموقة.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Certifications Section ----------
function CertificationsSection() {
  const certifications = [
    { name: "وزارة الصحة", src: "/moh.png" },      
    { name: "ISO 22000", src: "/iso.png" },        
    { name: "AMMPS", src: "/ammps.png" },          
    { name: "ONSSA", src: "/onssa.png" },          
    { name: "IMANOR", src: "/imanor.png" },        
    { name: "FDA", src: "/fda.png" },              
  ];

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className={`${amiri.className} text-4xl md:text-5xl font-bold text-slate-950 mb-5`} dir="rtl">
          اعتمادات تضمن مصداقية براندك
        </h2>
        <p className={`${amiri.className} text-xl text-slate-600 max-w-3xl mx-auto`} dir="rtl">
          منتجاتنا حائزة على تراخيص من أبرز المؤسسات الوطنية والدولية، لتدخل السوق بقوة وثقة.
        </p>
      </div>

      <style>{`
        @keyframes scrollLogos {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-logos {
          display: flex;
          width: 200%; 
          animation: scrollLogos 25s linear infinite;
        }
        .animate-logos:hover {
          animation-play-state: paused; 
        }
      `}</style>

      <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-slate-50 to-transparent z-10"></div>

        <div className="animate-logos flex items-center">
          {[...certifications, ...certifications].map((cert, index) => (
            <div key={index} className="flex-none w-48 md:w-64 mx-6 flex items-center justify-center hover:scale-105 transition-transform duration-300">
              <div className="relative w-36 h-24 md:w-48 md:h-28 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center p-5 grayscale hover:grayscale-0 transition-all duration-500">
                 <Image 
                    src={cert.src} 
                    alt={cert.name} 
                    fill 
                    className="object-contain p-2"
                 />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Featured Products ----------
async function FeaturedProducts() {
  const products = await getProducts();

  return (
    <section className="py-28 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className={`${amiri.className} text-4xl md:text-5xl font-bold text-slate-950 tracking-tight`}>
            روائع التجميل الطبي الجاهزة للتخصيص
          </h2>
          <p className={`${amiri.className} mt-6 text-2xl text-slate-600 font-light max-w-3xl mx-auto`}>
            اكتشف تشكيلتنا الحصرية من التركيبات عالية الطلب، المستعدة لتحمل اسم علامتك التجارية وتغزو الأسواق.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-10">
          {products && products.length > 0 ? (
            products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className={`${amiri.className} col-span-full text-center text-slate-500 py-16 font-light border-2 border-dashed border-slate-200 rounded-3xl text-xl`}>
              لا توجد تركيبات جاهزة حالياً. المرجو إضافتها عبر Sanity Studio لبدء العرض.
            </div>
          )}
        </div>

        <div className="text-center mt-20">
          <Link
            href="/products"
            className={`${amiri.className} inline-block border-2 border-[#0B3B60] text-[#0B3B60] hover:bg-[#0B3B60] hover:text-white px-10 py-4 rounded-full font-bold text-xl transition-all duration-300`}
          >
            استكشف الكتالوج الطبي الكامل لبراندك
          </Link>
        </div>
      </div>
    </section>
  );
}

// ---------- Main Page Component ----------
export default async function HomePage() {
  return (
    <main className="min-h-screen selection:bg-[#D4AF37] selection:text-[#0B3B60]">
      <Header />
      <Hero />
      <GlassMarquee />
      <GoldCardSection /> 
      <FeaturedProducts />
      <CertificationsSection />
      <Footer />
    </main>
  );
}