import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Amiri } from "next/font/google";
import { createClient } from "next-sanity";

// إعداد الاتصال مع Sanity
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // كيجيب الـ ID من ملف .env ديالك
  dataset: "production",
  apiVersion: "2024-03-09", // أو أي تاريخ حديث
  useCdn: false,
});

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

// دالة جلب البيانات من Sanity
async function getProducts() {
  try {
    // 👈 التعديل تم هنا: زدنا الفيلتر ديال الجملة والترتيب
    const query = `*[_type == "product" && targetMarket in ["wholesale", "both"]] | order(_createdAt desc) {
      "id": _id,
      name,
      description,
      price,
      minOrder,
      "image": image.asset->url
    }`;
    
    // fetch data
    const products = await client.fetch(query, {}, { cache: 'no-store' });
    return products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      
      {/* ---------- Hero / Header Section ---------- */}
      <section className="relative bg-gradient-to-r from-teal-900 to-gray-900 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/" className="inline-block mb-6 text-teal-400 hover:text-teal-300 transition text-sm font-semibold tracking-wider">
            &larr; العودة للرئيسية
          </Link>
          <h1 className={`${amiri.className} text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md`} dir="rtl">
            مجموعة <span className="text-[#D4AF37]">INCIA</span> الطبية
          </h1>
          <p className={`${amiri.className} text-xl text-teal-100 max-w-2xl mx-auto leading-relaxed`} dir="rtl">
            اكتشف تشكيلتنا الحصرية من المنتجات التجميلية والعلاجية، المصممة بأعلى معايير الجودة لضمان نتائج مثالية لعملائك.
          </p>
        </div>
      </section>

      {/* ---------- Products Grid ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {products && products.length > 0 ? (
          /* السطر اللي تعدل باش يبانو جوج منتجات فالتليفون */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-16 text-center max-w-2xl mx-auto mt-12">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl text-gray-400">📦</span>
            </div>
            <h3 className={`${amiri.className} text-2xl font-bold text-gray-800 mb-2`} dir="rtl">
              لا توجد منتجات حالياً
            </h3>
            <p className={`${amiri.className} text-gray-500`} dir="rtl">
              المرجو إضافة المنتجات والصور من لوحة تحكم Sanity الخاصة بك ليتم عرضها هنا.
            </p>
          </div>
        )}
      </section>
      
      {/* ---------- Banner السفلي ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-[#FFFDF2] border border-[#D4AF37]/30 rounded-2xl p-8 md:p-12 text-center shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-right flex-1" dir="rtl">
            <h3 className={`${amiri.className} text-2xl font-bold text-[#8B6508] mb-2`}>
              هل تبحث عن الشراء بالجملة؟
            </h3>
            <p className={`${amiri.className} text-gray-600 text-lg`}>
              نوفر أسعاراً خاصة وشروطاً مميزة للعيادات والصيدليات والموزعين المعتمدين.
            </p>
          </div>
          <Link 
            href="/wholesale" 
            className="bg-[#D4AF37] hover:bg-[#b5952f] text-white px-8 py-3 rounded-full font-bold transition shadow-md whitespace-nowrap"
          >
            اكتشف عروض الجملة
          </Link>
        </div>
      </section>

    </main>
  );
}