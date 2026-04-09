import Link from "next/link";
import { Amiri } from "next/font/google";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* ---------- Hero Section (واجهة الصفحة) ---------- */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/95 to-gray-900/80 z-0" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <div className="inline-block mb-4 px-6 py-2 border border-[#D4AF37] rounded-full bg-black/20 backdrop-blur-sm">
            <span className={`${amiri.className} text-[#D4AF37] text-lg font-bold`} dir="rtl">
              مختبر INCIA 
            </span>
          </div>
          <h1 className={`${amiri.className} text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg`} dir="rtl">
            حيث تلتقي <span className="text-[#D4AF37]">العلوم الطبية</span> بجمال الطبيعة
          </h1>
          <p className={`${amiri.className} text-xl text-gray-200 leading-relaxed`} dir="rtl">
            نحن نصنع التميز في عالم التجميل الطبي، ونقدم حلولاً مبتكرة وآمنة تناسب أرقى العيادات والمتخصصين في جميع أنحاء العالم.
          </p>
        </div>
      </section>

      {/* ---------- INCIA Lab History Section (قسم تاريخ المختبر) ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row-reverse">
          {/* صورة المختبر */}
          <div className="w-full md:w-2/5 h-80 md:h-auto relative">
            <img 
              src="incia.png" 
              alt="مختبر INCIA" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden" />
          </div>
          
          {/* معلومات المختبر */}
          <div className="w-full md:w-3/5 p-8 md:p-16 flex flex-col justify-center text-right" dir="rtl">
            <div className="flex items-center gap-3 mb-4 justify-end">
              <h2 className={`${amiri.className} text-3xl md:text-4xl font-bold text-teal-900`}>
                رؤيتنا العلمية
              </h2>
              <div className="w-12 h-1 bg-[#D4AF37] rounded-full"></div>
            </div>
            
            <h3 className="text-gray-500 font-semibold mb-6 tracking-wider uppercase text-sm">
              التميز في التجميل الطبي والعناية بالبشرة
            </h3>
            
            <div className={`${amiri.className} space-y-4 text-gray-700 text-lg leading-relaxed`}>
              <p>
                بخبرة سنوات طويلة وشغف لا ينتهي بمجال الصيدلة والتجميل الطبي، تأسس <span className="font-bold text-[#8B6508]">مختبر INCIA</span> ليكون رائداً في تقديم منتجات تجمع بين الفعالية السريرية والمكونات الآمنة.
              </p>
              <p>
                رؤيتنا تتلخص في تمكين المتخصصين وأصحاب العيادات من تقديم الأفضل لعملائهم، من خلال توفير منتجات معتمدة ومدروسة بعناية فائقة، تواكب أحدث التطورات العلمية العالمية.
              </p>
              <p className="font-bold text-teal-800 bg-teal-50 p-4 rounded-lg border-r-4 border-teal-600 mt-6">
                "مهمتنا ليست فقط صناعة منتجات تجميلية، بل ابتكار حلول علاجية تعيد الثقة وتبرز الجمال الحقيقي بكل أمان."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Lab Quality & Vision Section (الجودة والمختبر) ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-16">
          <h2 className={`${amiri.className} text-3xl md:text-5xl font-bold text-gray-900 mb-4`} dir="rtl">
            لماذا تختار <span className="text-teal-600">INCIA Lab</span>؟
          </h2>
          <p className={`${amiri.className} text-lg text-gray-600 max-w-2xl mx-auto`} dir="rtl">
            نلتزم بأعلى معايير الجودة العالمية في كل خطوة، من اختيار المواد الخام إلى المنتج النهائي.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#D4AF37]">
            <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center mb-6 ml-auto">
              <span className="text-2xl">🔬</span>
            </div>
            <h3 className={`${amiri.className} text-2xl font-bold text-gray-900 mb-3 text-right`} dir="rtl">
              تكنولوجيا متطورة
            </h3>
            <p className="text-gray-600 text-right leading-relaxed" dir="rtl">
              نستخدم أحدث المعدات التكنولوجية في مختبراتنا لضمان دقة التركيبات وفعاليتها القصوى.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border-t-4 border-teal-600">
            <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center mb-6 ml-auto">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className={`${amiri.className} text-2xl font-bold text-gray-900 mb-3 text-right`} dir="rtl">
              أمان وموثوقية
            </h3>
            <p className="text-gray-600 text-right leading-relaxed" dir="rtl">
              جميع منتجاتنا تخضع لاختبارات سريرية صارمة، وحاصلة على التراخيص من وزارة الصحة ومؤسسات الجودة العالمية.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#D4AF37]">
            <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center mb-6 ml-auto">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className={`${amiri.className} text-2xl font-bold text-gray-900 mb-3 text-right`} dir="rtl">
              شراكة استراتيجية
            </h3>
            <p className="text-gray-600 text-right leading-relaxed" dir="rtl">
              نوفر دعماً كاملاً لشركائنا من العيادات وأصحاب العلامات التجارية (Private Label) لضمان نجاحهم وتميزهم.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- CTA Section (دعوة للعمل) ---------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-gradient-to-r from-teal-900 to-teal-700 rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-[#D4AF37] opacity-20 rounded-full blur-3xl"></div>
          
          <h2 className={`${amiri.className} text-3xl md:text-4xl font-bold text-white mb-6 relative z-10`} dir="rtl">
            هل أنت مستعد لتأسيس علامتك التجارية الخاصة؟
          </h2>
          <p className={`${amiri.className} text-xl text-teal-100 mb-8 max-w-2xl mx-auto relative z-10`} dir="rtl">
            استفد من خبرة مختبر INCIA لتحويل فكرتك إلى منتجات تجميلية طبية ناجحة وموثوقة.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link 
              href="/wholesale" 
              className="bg-[#D4AF37] hover:bg-[#b5952f] text-white px-8 py-4 rounded-full font-bold text-lg transition duration-300 shadow-lg transform hover:-translate-y-1"
            >
              ابدأ مشروعك الآن
            </Link>
            <Link 
              href="/contact" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-900 px-8 py-4 rounded-full font-bold text-lg transition duration-300"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}