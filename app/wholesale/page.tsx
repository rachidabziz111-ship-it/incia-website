import Link from "next/link";
import { Amiri } from "next/font/google";

// إعداد خط أميري
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

export default function WholesalePage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-24 selection:bg-teal-900 selection:text-white">
      
      {/* ---------- Hero Section ---------- */}
      <section className="relative bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 text-white py-24 overflow-hidden">
        {/* خلفية مزخرفة وتأثيرات الإضاءة */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/arabesque.png')" }}></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] opacity-20 rounded-full blur-[100px] -mt-20 -mr-20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-400 opacity-20 rounded-full blur-[100px] -mb-20 -ml-20"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <Link href="/" className="inline-block mb-8 px-6 py-2 border border-teal-600/50 rounded-full bg-black/20 backdrop-blur-sm text-teal-100 hover:text-white hover:bg-black/30 hover:border-teal-500 transition-all duration-300 text-sm font-semibold tracking-wider">
            &larr; العودة للرئيسية
          </Link>
          <h1 className={`${amiri.className} text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg`} dir="rtl">
            برنامج الشراكة <span className="text-[#D4AF37]">والبيع بالجملة</span>
          </h1>
          <p className={`${amiri.className} text-lg md:text-xl text-teal-50 max-w-3xl mx-auto leading-relaxed`} dir="rtl">
            سواء كنت تمتلك عيادة، صيدلية، أو تحلم بإطلاق علامتك التجارية الخاصة في عالم التجميل الطبي، مختبر INCIA هو شريكك الاستراتيجي للنجاح.
          </p>
        </div>
      </section>

      {/* ---------- Partnership Models (أنواع الشراكة) ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Wholesale */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 group hover:shadow-2xl hover:shadow-teal-900/10 transition-all duration-500 transform hover:-translate-y-2">
            <div className="h-48 bg-gradient-to-br from-teal-50 to-white relative flex items-center justify-center border-b border-gray-100 group-hover:bg-teal-50/50 transition-colors">
              <span className="text-6xl drop-shadow-md transform group-hover:scale-110 transition-transform duration-500">📦</span>
              <div className="absolute top-6 right-6 bg-teal-100 text-teal-900 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                للعيادات والموزعين
              </div>
            </div>
            <div className="p-8 md:p-10 text-right" dir="rtl">
              <h3 className={`${amiri.className} text-3xl font-bold text-teal-900 mb-4 group-hover:text-teal-700 transition-colors`}>الشراء بالجملة</h3>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                نوفر أسعاراً تنافسية وخصومات خاصة للكميات الكبيرة، مع ضمان توفر المنتجات وتوصيلها السريع. منتجاتنا جاهزة لدعم عيادتك أو صيدليتك.
              </p>
              <ul className="space-y-4 mb-4 text-gray-700 font-medium">
                <li className="flex items-center gap-3 justify-start flex-row-reverse">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-teal-100 text-teal-700 text-sm">✓</span> 
                  أسعار خاصة ومدروسة
                </li>
                <li className="flex items-center gap-3 justify-start flex-row-reverse">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-teal-100 text-teal-700 text-sm">✓</span> 
                  جودة طبية معتمدة
                </li>
                <li className="flex items-center gap-3 justify-start flex-row-reverse">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-teal-100 text-teal-700 text-sm">✓</span> 
                  دعم فني وتسويقي مستمر
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Private Label */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-[#D4AF37]/50 group hover:border-[#D4AF37] hover:shadow-2xl hover:shadow-[#D4AF37]/20 transition-all duration-500 transform hover:-translate-y-2 relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D4AF37] to-[#b5952f] text-white flex items-center justify-center rounded-bl-[3rem] font-bold text-xl z-10 shadow-lg">
              <span className="mb-6 ml-6 font-serif">VIP</span>
            </div>
            <div className="h-48 bg-gradient-to-br from-[#FFFDF2] to-[#FFF9E6] relative flex items-center justify-center border-b border-[#D4AF37]/20 group-hover:from-[#FFF9E6] transition-colors">
              <span className="text-6xl drop-shadow-md transform group-hover:scale-110 transition-transform duration-500">✨</span>
              <div className="absolute top-6 left-6 bg-[#D4AF37] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                صناعة العلامات التجارية
              </div>
            </div>
            <div className="p-8 md:p-10 text-right" dir="rtl">
              <h3 className={`${amiri.className} text-3xl font-bold text-[#8B6508] mb-4`}>العلامة الخاصة (Private Label)</h3>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                بإشراف فريقنا من الخبراء والصيادلة، نساعدك على تطوير وإنتاج خط مستحضرات التجميل الخاص بك، من الفكرة إلى المنتج النهائي المعتمد.
              </p>
              <ul className="space-y-4 mb-4 text-gray-700 font-medium">
                <li className="flex items-center gap-3 justify-start flex-row-reverse">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#FFF9E6] text-[#D4AF37] text-sm">✓</span> 
                  تركيبات حصرية ومبتكرة
                </li>
                <li className="flex items-center gap-3 justify-start flex-row-reverse">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#FFF9E6] text-[#D4AF37] text-sm">✓</span> 
                  التكفل بإجراءات الترخيص (وزارة الصحة)
                </li>
                <li className="flex items-center gap-3 justify-start flex-row-reverse">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#FFF9E6] text-[#D4AF37] text-sm">✓</span> 
                  تصميم العبوات والتغليف
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ---------- Steps Section (خطوات العمل) ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="text-center mb-20">
          <h2 className={`${amiri.className} text-3xl md:text-5xl font-bold text-gray-900 mb-6`} dir="rtl">
            كيف تبدأ معنا؟
          </h2>
          <div className="w-24 h-1.5 bg-[#D4AF37] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative">
          {/* خط يربط بين الخطوات فالشاشات الكبيرة */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
          
          {[
            { step: "1", title: "تواصل معنا", desc: "حدد احتياجاتك سواء جملة أو علامة خاصة." },
            { step: "2", title: "الاستشارة العلمية", desc: "دراسة المشروع واختيار التركيبات المناسبة." },
            { step: "3", title: "الإنتاج والتراخيص", desc: "التصنيع بأعلى المعايير وتسوية التراخيص." },
            { step: "4", title: "الاستلام", desc: "استلم منتجاتك جاهزة لاكتساح السوق." }
          ].map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 text-center relative transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-14 h-14 bg-teal-900 text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto -mt-14 mb-6 shadow-lg shadow-teal-900/30 ring-4 ring-white group-hover:bg-[#D4AF37] transition-colors duration-300">
                {item.step}
              </div>
              <h4 className={`${amiri.className} text-xl font-bold text-gray-900 mb-3`} dir="rtl">{item.title}</h4>
              <p className="text-gray-500 leading-relaxed" dir="rtl">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Contact CTA ---------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-125"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-[#D4AF37] opacity-20 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-125"></div>
          
          <h2 className={`${amiri.className} text-3xl md:text-4xl font-bold text-white mb-6 relative z-10`} dir="rtl">
            جاهز للانطلاق وتأسيس مشروعك؟
          </h2>
          <p className={`${amiri.className} text-xl text-teal-100/90 mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed`} dir="rtl">
            فريقنا مستعد للإجابة على جميع استفساراتك وتقديم عرض أسعار مخصص لمشروعك التجميلي.
          </p>
          <Link 
            href="/contact" 
            className={`${amiri.className} inline-block bg-[#D4AF37] hover:bg-[#b5952f] text-white px-12 py-4 rounded-full font-bold text-xl transition-all duration-300 shadow-xl shadow-[#D4AF37]/30 transform hover:-translate-y-1 hover:scale-105 relative z-10`}
          >
            اتصل بنا الآن
          </Link>
        </div>
      </section>

    </main>
  );
}