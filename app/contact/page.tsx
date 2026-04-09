"use client"; 

import { useState, useEffect } from "react";
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

// تعريف نوع بيانات الموظف
type Employee = {
  _id: string;
  name: string;
  role: string;
  whatsapp: string;
  imageUrl?: string;
};

export default function ContactPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // التحكم في النافذة

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    type: "استفسار عام",
    message: ""
  });

  // 2. جلب الموظفين من Sanity
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const query = `*[_type == "employee"]{
          _id,
          name,
          role,
          whatsapp,
          "imageUrl": image.asset->url
        }`;
        
        const data = await client.fetch(query, {}, { cache: 'no-store' });
        setEmployees(data || []);
      } catch (error) {
        console.error("مشكل في جلب الموظفين من Sanity:", error);
      }
    };

    fetchEmployees();
  }, []);

  const cleanPhone = (phone: string) => phone.replace(/[^0-9]/g, '');

  // 3. دالة إظهار نافذة اختيار الموظف عوض الإرسال المباشر
  const handleOpenModal = (e: React.FormEvent) => {
    e.preventDefault();

    if (employees.length === 0) {
      alert("عذرا، لا يوجد موظف متاح حاليا لاستقبال رسالتك. المرجو المحاولة لاحقا.");
      return;
    }

    // فتح النافذة ليختار الكليان المستشار
    setIsModalOpen(true);
  };

  // 4. دالة الإرسال الفعلي للواتساب بعد اختيار الموظف
  const sendToWhatsApp = (employeeWhatsapp: string) => {
    const text = `السلام عليكم مختبر INCIA،
    
*الاسم:* ${formData.name}
*رقم الهاتف:* ${formData.phone}
*البريد الإلكتروني:* ${formData.email || "لم يتم الإدخال"}
*نوع الاستفسار:* ${formData.type}

*الرسالة:*
${formData.message}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${cleanPhone(employeeWhatsapp)}?text=${encodedText}`;

    setIsModalOpen(false); // سد النافذة
    window.open(whatsappUrl, "_blank"); // حل الواتساب
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-24 relative">
      
      {/* ---------- Hero Section ---------- */}
      <section className="relative bg-teal-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`${amiri.className} text-4xl md:text-5xl font-bold mb-6`} dir="rtl">
            تواصل <span className="text-[#D4AF37]">معنا</span>
          </h1>
          <p className={`${amiri.className} text-xl text-teal-100 max-w-2xl mx-auto`} dir="rtl">
            فريق مختبر INCIA رهن إشارتك للإجابة على جميع استفساراتك وتلبية طلباتك.
          </p>
        </div>
      </section>

      {/* ---------- Contact Form & Info Section ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row-reverse">
          
          {/* معلومات التواصل */}
          <div className="w-full lg:w-2/5 bg-gradient-to-br from-teal-800 to-teal-900 p-10 md:p-14 text-right flex flex-col justify-between relative overflow-hidden" dir="rtl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl -mt-20 -mr-20"></div>
            
            <div className="relative z-10">
              <h3 className={`${amiri.className} text-3xl font-bold text-white mb-8`}>
                معلومات الاتصال
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-700/50 rounded-full flex items-center justify-center flex-shrink-0 border border-teal-600/50">
                    <span className="text-[#D4AF37] text-xl">📍</span>
                  </div>
                  <div>
                    <h4 className="text-teal-100 font-semibold mb-1">العنوان</h4>
                    <p className="text-white leading-relaxed">
                      الدار البيضاء، المغرب<br />
                      (مقر مختبر INCIA)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-700/50 rounded-full flex items-center justify-center flex-shrink-0 border border-teal-600/50">
                    <span className="text-[#D4AF37] text-xl">📞</span>
                  </div>
                  <div>
                    <h4 className="text-teal-100 font-semibold mb-1">واتساب المباشر</h4>
                    <p className="text-white text-sm mt-1">
                      {employees.length > 0 ? "اختر مستشاراً من القائمة عند المراسلة" : "الخدمة غير متاحة حاليا"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-700/50 rounded-full flex items-center justify-center flex-shrink-0 border border-teal-600/50">
                    <span className="text-[#D4AF37] text-xl">✉️</span>
                  </div>
                  <div>
                    <h4 className="text-teal-100 font-semibold mb-1">البريد الإلكتروني</h4>
                    <p className="text-white">contact@incia.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* الفورميلير لي غيصيفط للواتساب */}
          <div className="w-full lg:w-3/5 p-10 md:p-14" dir="rtl">
            <h3 className={`${amiri.className} text-3xl font-bold text-gray-900 mb-2`}>
              أرسل لنا رسالة عبر واتساب
            </h3>
            <p className="text-gray-500 mb-8">
              املأ الاستمارة وسنقوم بتحويلك لاختيار المستشار المناسب للتواصل معه عبر واتساب.
            </p>

            <form onSubmit={handleOpenModal} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل *</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
                    placeholder="الاسم والنسب"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
                    placeholder="رقم الهاتف"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني (اختياري)</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white"
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع الاستفسار</label>
                <select 
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white text-gray-700"
                >
                  <option value="استفسار عام">استفسار عام</option>
                  <option value="طلب شراء بالجملة">طلب شراء بالجملة للعيادات/الصيدليات</option>
                  <option value="مشروع علامة تجارية خاصة">مشروع علامة تجارية خاصة (Private Label)</option>
                  <option value="خدمة ما بعد البيع">خدمة ما بعد البيع</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الرسالة *</label>
                <textarea 
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-600 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white resize-none"
                  placeholder="اكتب رسالتك أو تفاصيل مشروعك هنا..."
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-lg py-4 rounded-lg transition duration-300 shadow-md"
              >
                <span>متابعة لإرسال الرسالة</span>
                <span className="text-2xl">💬</span>
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* ---------- النافذة (Modal) لي غتطلع ملي يعمر الفورم ---------- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100" dir="rtl">
            
            <div className="bg-[#25D366] text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-xl">اختر المستشار لإرسال الرسالة</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white hover:text-gray-200 text-3xl leading-none focus:outline-none">
                &times;
              </button>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <p className="text-gray-600 mb-6 text-sm text-center bg-green-50 p-3 rounded-lg border border-green-100">
                لقد تم تجهيز رسالتك بنجاح! المرجو اختيار المستشار الذي تود إرسالها إليه:
              </p>
              
              <div className="space-y-3">
                {employees.map((emp) => (
                  <button
                    key={emp._id}
                    onClick={() => sendToWhatsApp(emp.whatsapp)} // ملي يختار المستشار، غيصيفط ليه
                    className="w-full flex items-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-[#25D366] hover:shadow-md transition-all group text-right"
                  >
                    <div className="w-14 h-14 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 ml-4 border-2 border-transparent group-hover:border-[#25D366] transition-colors">
                      {emp.imageUrl ? (
                        <img src={emp.imageUrl} alt={emp.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">👤</div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-lg group-hover:text-[#25D366] transition-colors">{emp.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{emp.role || 'خدمة العملاء'}</p>
                    </div>
                    
                    <div className="text-[#25D366] bg-[#25D366]/10 w-10 h-10 flex items-center justify-center rounded-full group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="transform rotate-180">
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}