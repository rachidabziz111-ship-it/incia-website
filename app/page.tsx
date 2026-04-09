import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Amiri } from "next/font/google"; 

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

async function getProducts() {
  try {
    const res = await fetch('http://localhost:1337/api/products?populate=*', {
      cache: 'no-store'
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// ---------- Header Component ----------
function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">I</span>
            </div>
            <span className="font-serif text-xl font-semibold text-gray-900">
              INCIA<span className="text-teal-600">®</span>
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-teal-600 transition">Home</Link>
            <Link href="/products" className="text-gray-700 hover:text-teal-600 transition">Products</Link>
            <Link href="/about" className="text-gray-700 hover:text-teal-600 transition">Lab</Link>
            <Link href="/wholesale" className="text-gray-700 hover:text-teal-600 transition">Wholesale</Link>
            <Link href="/contact" className="text-gray-700 hover:text-teal-600 transition">Contact</Link>
          </nav>

          <div>
            <Link
              href="/wholesale"
              className="hidden sm:inline-block bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition shadow-md hover:shadow-lg"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// ---------- Footer Component ----------
function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">I</span>
              </div>
              <span className="font-serif text-xl font-semibold">INCIA®</span>
            </div>
            <p className="text-gray-400 text-sm">
              Premium medical aesthetics for clinics and professionals.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[#D4AF37]">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/products" className="hover:text-white">Products</Link></li>
              <li><Link href="/wholesale" className="hover:text-white">Wholesale Program</Link></li>
              <li><Link href="/about" className="hover:text-white">About Lab</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[#D4AF37]">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>contact@incia.com</li>
              <li>+212 5XX XXX XXX</li>
              <li>Casablanca, Morocco</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[#D4AF37]">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
          © 2025 INCIA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ---------- Hero Section ----------
function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-teal-900/90 to-gray-900/90 text-white pb-10">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 md:py-32 lg:py-36">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Premium Medical Aesthetics <br />
            <span className="text-[#D4AF37]">for Professionals</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-100">
            Clinical-grade formulations, bulk pricing, and dedicated B2B support.
            Trusted by 200+ clinics worldwide.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-semibold transition shadow-lg"
            >
              Explore Catalog
            </Link>
            <Link
              href="/wholesale"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-6 py-3 rounded-full font-semibold transition"
            >
              Request Wholesale Access
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Glass Marquee ----------
function GlassMarquee() {
  return (
    <div className="relative z-20 -mt-10 mb-8 overflow-hidden">
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          display: inline-block;
          white-space: nowrap;
          animation: scrollLeft 25s linear infinite;
        }
      `}</style>
      
      <div className="w-full bg-white/10 backdrop-blur-md border-y border-white/20 shadow-lg py-4">
        <div className="animate-scroll">
          <span className={`${amiri.className} text-xl md:text-2xl font-bold text-white drop-shadow-md px-4`} dir="rtl">
            <span className="text-[#D4AF37] mx-2"></span>
          مع مختبر INCIA، تقدر تبدا علامتك التجارية الخاصة بكل ثقة 
            <span className="text-[#D4AF37] mx-2"></span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------- Gold Card Section ----------
function GoldCardSection() {
  return (
    <section className="py-12 bg-white px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden p-8 md:p-14 text-center shadow-xl border-4 border-[#D4AF37] bg-gradient-to-br from-[#FFFDF2] via-[#FFF9E6] to-[#FFFDF2]">
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center justify-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D4AF37" className="w-12 h-12 mb-2 drop-shadow-md">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
            <h2 className={`${amiri.className} text-3xl md:text-5xl font-bold text-[#8B6508] leading-relaxed drop-shadow-sm`} dir="rtl">
              مع مختبر INCIA الجودة والضمان بأحسن ثمن
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- 🎖️ Certifications & Trust Section (شواهد وتراخيص) ----------
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
    <section className="py-16 bg-gray-50 border-t border-b border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        {/* العنوان باللون الذهبي */}
        <h2 className={`${amiri.className} text-3xl md:text-4xl font-bold text-[#8B6508] mb-4`} dir="rtl">
          شواهد وتراخيص
        </h2>
        <p className={`${amiri.className} text-lg text-gray-600 max-w-2xl mx-auto`} dir="rtl">
          منتجاتنا مرخصة من المؤسسات المحلية والدولية، مما يضمن جودتها وسلامتها.
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
          animation: scrollLogos 20s linear infinite;
        }
        .animate-logos:hover {
          animation-play-state: paused; 
        }
      `}</style>

      <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

        <div className="animate-logos flex items-center">
          {[...certifications, ...certifications].map((cert, index) => (
            <div key={index} className="flex-none w-40 md:w-56 mx-4 flex items-center justify-center hover:scale-105 transition-transform duration-300">
              {/* حيدنا grayscale وزدنا hover:scale-105 باش يكبرو شوية ملي تدوز عليهم بلاصوري */}
              <div className="relative w-32 h-20 md:w-40 md:h-24 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center p-4">
                 
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Bestsellers for Clinics</h2>
          <p className="mt-2 text-gray-600">High‑demand products with bulk pricing</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products && products.length > 0 ? (
            products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-8">
              لا توجد منتجات حاليا. المرجو إضافتها من لوحة تحكم Strapi.
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-block border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-6 py-3 rounded-full font-semibold transition"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

// ---------- Main Page Component ----------
export default async function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <GlassMarquee />
      <GoldCardSection /> 
      <FeaturedProducts />
      
      {/* 👈 هاهي فقرة الشواهد والتراخيص بالألوان والعنوان الذهبي */}
      <CertificationsSection />
      
      <Footer />
    </main>
  );
}