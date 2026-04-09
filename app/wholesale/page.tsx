import Link from "next/link";
import { Amiri } from "next/font/google";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

export default function WholesalePage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      
      {/* ---------- Hero Section ---------- */}
      <section className="relative bg-teal-900 text-white py-24 overflow-hidden">
        {/* خلفية مزخرفة */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/arabesque.png')" }}></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] opacity-20 rounded-full blur-3xl -mt-20 -mr-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500 opacity-20 rounded-full blur-3xl -mb-20 -ml-20"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/" className="inline-block mb-6 text-teal-300 hover:text-white transition text-sm font-semibold tracking-wider">
            &larr; العودة للرئيسية
          </Link>
          <h1 className={`${amiri.className} text-4xl md:text-6xl font-bold mb-6 leading-tight`} dir="rtl">
            برنامج الشراكة <span className="text-[#D4AF37]">والبيع بالجملة</span>
          </h1>
          <p className={`${amiri.className} text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed`} dir="rtl">
            سواء كنت تمتلك عيادة، صيدلية، أو تحلم بإطلاق علامتك التجارية الخاصة في عالم التجميل الطبي، مختبر INCIA هو شريكك الاستراتيجي للنجاح.
          </p>
        </div>
      </section>

      {/* ---------- Partnership Models (أنواع الشراكة) ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Wholesale */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
            <div className="h-48 bg-gradient-to-br from-teal-50 to-white relative flex items-center justify-center border-b border-gray-100">
              <span className="text-6xl drop-shadow-md">📦</span>
              <div className="absolute top-4 right-4 bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                للعيادات والموزعين
              </div>
            </div>
            <div className="p-8 text-right" dir="rtl">
              <h3 className={`${amiri.className} text-3xl font-bold text-gray-900 mb-4`}>الشراء بالجملة</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                نوفر أسعاراً تنافسية وخصومات خاصة للكميات الكبيرة، مع ضمان توفر المنتجات وتوصيلها السريع. منتجاتنا جاهزة لدعم عيادتك أو صيدليتك.
              </p>
              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-center gap-3 justify-start flex-row-reverse">
                  <span className="text-[#D4AF37]">✓</span> أسعار خاصة ومدروسة
                </li>
                <li className="flex items-center gap-3 justify-start flex-row-reverse">
                  <span className="text-[#D4AF37]">✓</span> جودة طبية معتمدة
                </li>
                <li className="flex items-center gap-3 justify-start flex-row-reverse">
                  <span className="text-[#D4AF37]">✓</span> دعم فني وتسويقي مستمر
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Private Label */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-[#D4AF37] hover:-translate-y-2 transition-transform duration-300 relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#D4AF37] text-white flex items-center justify-center rounded-bl-full font-bold text-lg z-10 shadow-md">
              <span className="mb-4 ml-4">VIP</span>
            </div>
            <div className="h-48 bg-gradient-to-br from-[#FFFDF2] to-[#FFF9E6] relative flex items-center justify-center border-b border-[#D4AF37]/20">
              <span className="text-6xl drop-shadow-md">✨</span>
              <div className="absolute top-4 left-4 bg-[#D4AF37] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                صناعة العلامات التجارية
              </div>
            </div>
            <div className="p-8 text-right" dir="rtl">
              <h3 className={`${amiri.className} text-3xl font-bold text-[#8B6508] mb-4`}>العلامة الخاصة (Private Label)</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                تحت إشراف الدكتورة كوثر فاتح، نساعدك على تطوير وإنتاج خط مستحضرات التجميل الخاص بك، من الفكرة إلى المنتج النهائي المعتمد.
              </p>
              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-center gap-3 justify-start flex-row-reverse">
                  <span className="text-teal-600">✓</span> تركيبات حصرية ومبتكرة
                </li>
                <li className="flex items-center gap-3 justify-start flex-row-reverse">
                  <span className="text-teal-600">✓</span> التكفل بإجراءات الترخيص (وزارة الصحة)
                </li>
                <li className="flex items-center gap-3 justify-start flex-row-reverse">
                  <span className="text-teal-600">✓</span> تصميم العبوات والتغليف
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ---------- Steps Section (خطوات العمل) ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-16">
          <h2 className={`${amiri.className} text-3xl md:text-5xl font-bold text-gray-900 mb-4`} dir="rtl">
            كيف تبدأ معنا؟
          </h2>
          <div className="w-24 h-1 bg-teal-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* خط يربط بين الخطوات فالشاشات الكبيرة */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
          
          {[
            { step: "1", title: "تواصل معنا", desc: "حدد احتياجاتك سواء جملة أو علامة خاصة." },
            { step: "2", title: "الاستشارة العلمية", desc: "دراسة المشروع واختيار التركيبات المناسبة." },
            { step: "3", title: "الإنتاج والتراخيص", desc: "التصنيع بأعلى المعايير وتسوية التراخيص." },
            { step: "4", title: "الاستلام", desc: "استلم منتجاتك جاهزة لاكتساح السوق." }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-center relative">
              <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto -mt-12 mb-4 shadow-lg ring-4 ring-white">
                {item.step}
              </div>
              <h4 className={`${amiri.className} text-xl font-bold text-gray-800 mb-2`} dir="rtl">{item.title}</h4>
              <p className="text-gray-500 text-sm" dir="rtl">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Contact CTA ---------- */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-[#FFFDF2] rounded-3xl p-10 text-center shadow-lg border-2 border-[#D4AF37]">
          <h2 className={`${amiri.className} text-3xl font-bold text-[#8B6508] mb-4`} dir="rtl">
            جاهز للانطلاق؟
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto" dir="rtl">
            فريقنا مستعد للإجابة على جميع استفساراتك وتقديم عرض أسعار مخصص لمشروعك.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-full font-bold text-lg transition duration-300 shadow-md"
          >
            اتصل بنا الآن
          </Link>
        </div>
      </section>

    </main>
  );
}