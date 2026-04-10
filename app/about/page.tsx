import Link from "next/link";
import Image from "next/image";
import { Amiri } from "next/font/google";

// إعداد خط أميري
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20 selection:bg-teal-900 selection:text-white">
      
      {/* ---------- Hero Section (واجهة الصفحة) ---------- */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* خلفية الواجهة */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
          }}
          aria-hidden="true"
        />
        {/* طبقة شفافة فوق الخلفية */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-gray-900/80 z-0" />
        
        {/* محتوى الواجهة */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16 animate-fade-in-up">
          <div className="inline-block mb-6 px-6 py-2 border border-[#D4AF37] rounded-full bg-black/30 backdrop-blur-md shadow-lg">
            <span className={`${amiri.className} text-[#D4AF37] text-lg md:text-xl font-bold tracking-wide`} dir="rtl">
              مختبر INCIA 
            </span>
          </div>
          <h1 className={`${amiri.className} text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl`} dir="rtl">
            حيث تلتقي <span className="text-[#D4AF37]">العلوم الطبية</span> بجمال الطبيعة
          </h1>
          <p className={`${amiri.className} text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto`} dir="rtl">
            نحن نصنع التميز في عالم التجميل الطبي، ونقدم حلولاً مبتكرة وآمنة تناسب أرقى العيادات والمتخصصين في جميع أنحاء العالم.
          </p>
        </div>
      </section>

      {/* ---------- INCIA Lab History Section (قسم تاريخ المختبر) ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-24 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row-reverse transform transition-all duration-500 hover:shadow-teal-900/10">
          
          {/* صورة المختبر باستخدام Next Image */}
          <div className="w-full md:w-2/5 h-64 md:h-auto relative group overflow-hidden">
            <Image 
              src="/incia.png" 
              alt="مختبر INCIA من الداخل" 
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
          </div>
          
          {/* معلومات المختبر */}
          <div className="w-full md:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center text-right" dir="rtl">
            <div className="flex items-center gap-4 mb-4 justify-end">
              <h2 className={`${amiri.className} text-3xl md:text-4xl font-bold text-teal-900`}>
                رؤيتنا العلمية
              </h2>
              <div className="w-16 h-1.5 bg-[#D4AF37] rounded-full"></div>
            </div>
            
            <h3 className="text-gray-400 font-bold mb-8 tracking-widest uppercase text-sm">
              التميز في التجميل الطبي والعناية بالبشرة
            </h3>
            
            <div className={`${amiri.className} space-y-6 text-gray-700 text-lg md:text-xl leading-relaxed`}>
              <p>
                بخبرة سنوات طويلة وشغف لا ينتهي بمجال الصيدلة والتجميل الطبي، تأسس <span className="font-bold text-[#D4AF37]">مختبر INCIA</span> ليكون رائداً في تقديم منتجات تجمع بين الفعالية السريرية والمكونات الآمنة.
              </p>
              <p>
                رؤيتنا تتلخص في تمكين المتخصصين وأصحاب العيادات من تقديم الأفضل لعملائهم، من خلال توفير منتجات معتمدة ومدروسة بعناية فائقة، تواكب أحدث التطورات العلمية العالمية.
              </p>
              <blockquote className="font-bold text-teal-900 bg-teal-50/50 p-6 rounded-2xl border-r-4 border-teal-600 mt-8 shadow-sm">
                "مهمتنا ليست فقط صناعة منتجات تجميلية، بل ابتكار حلول علاجية تعيد الثقة وتبرز الجمال الحقيقي بكل أمان."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Lab Quality & Vision Section (الجودة والمختبر) ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 md:mt-32">
        <div className="text-center mb-16">
          <h2 className={`${amiri.className} text-3xl md:text-5xl font-bold text-gray-900 mb-6`} dir="rtl">
            لماذا تختار <span className="text-teal-600">INCIA Lab</span>؟
          </h2>
          <p className={`${amiri.className} text-lg md:text-xl text-gray-500 max-w-2xl mx-auto`} dir="rtl">
            نلتزم بأعلى معايير الجودة العالمية في كل خطوة، من اختيار المواد الخام إلى المنتج النهائي.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border-t-4 border-[#D4AF37] group">
            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-8 ml-auto transition-colors group-hover:bg-teal-100">
              <span className="text-3xl">🔬</span>
            </div>
            <h3 className={`${amiri.className} text-2xl font-bold text-gray-900 mb-4 text-right group-hover:text-teal-700 transition-colors`} dir="rtl">
              تكنولوجيا متطورة
            </h3>
            <p className="text-gray-600 text-right leading-relaxed text-lg" dir="rtl">
              نستخدم أحدث المعدات التكنولوجية في مختبراتنا لضمان دقة التركيبات وفعاليتها القصوى.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border-t-4 border-teal-600 group">
            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-8 ml-auto transition-colors group-hover:bg-teal-100">
              <span className="text-3xl">🛡️</span>
            </div>
            <h3 className={`${amiri.className} text-2xl font-bold text-gray-900 mb-4 text-right group-hover:text-teal-700 transition-colors`} dir="rtl">
              أمان وموثوقية
            </h3>
            <p className="text-gray-600 text-right leading-relaxed text-lg" dir="rtl">
              جميع منتجاتنا تخضع لاختبارات سريرية صارمة، وحاصلة على التراخيص من وزارة الصحة ومؤسسات الجودة العالمية.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border-t-4 border-[#D4AF37] group">
            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-8 ml-auto transition-colors group-hover:bg-teal-100">
              <span className="text-3xl">🤝</span>
            </div>
            <h3 className={`${amiri.className} text-2xl font-bold text-gray-900 mb-4 text-right group-hover:text-teal-700 transition-colors`} dir="rtl">
              شراكة استراتيجية
            </h3>
            <p className="text-gray-600 text-right leading-relaxed text-lg" dir="rtl">
              نوفر دعماً كاملاً لشركائنا من العيادات وأصحاب العلامات التجارية (Private Label) لضمان نجاحهم وتميزهم.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- CTA Section (دعوة للعمل) ---------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 md:mt-32">
        <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden group">
          {/* تأثيرات بصرية فالخلفية */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-teal-500 opacity-20 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-110"></div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-[#D4AF37] opacity-20 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-110"></div>
          
          <h2 className={`${amiri.className} text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 relative z-10 leading-tight`} dir="rtl">
            هل أنت مستعد لتأسيس علامتك التجارية الخاصة؟
          </h2>
          <p className={`${amiri.className} text-xl md:text-2xl text-teal-100/90 mb-10 max-w-3xl mx-auto relative z-10`} dir="rtl">
            استفد من خبرة مختبر INCIA لتحويل فكرتك إلى منتجات تجميلية طبية ناجحة وموثوقة.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <Link 
              href="/wholesale" 
              className={`${amiri.className} bg-[#D4AF37] hover:bg-[#b5952f] text-white px-10 py-4 rounded-full font-bold text-xl transition-all duration-300 shadow-xl shadow-[#D4AF37]/30 transform hover:-translate-y-1 hover:scale-105 active:scale-95`}
            >
              ابدأ مشروعك الآن
            </Link>
            <Link 
              href="/contact" 
              className={`${amiri.className} bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white hover:bg-white hover:text-teal-900 px-10 py-4 rounded-full font-bold text-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}