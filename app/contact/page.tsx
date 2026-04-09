"use client"; 

import { useState, useEffect } from "react";
import { Amiri } from "next/font/google";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

export default function ContactPage() {
  // 1. هنا غنخبيو النمرة لي غنجيبو من Strapi أوتوماتيكيا
  const [dynamicWhatsappNumber, setDynamicWhatsappNumber] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    type: "استفسار عام",
    message: ""
  });

  // 2. هاد الـ useEffect غتمشي لـ Strapi تجيب نمرة الموظف النشيط غير تحل الصفحة
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
        const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        
        // 👈 استعملنا نفس الرابط الصحيح ديال الموظفين
        const res = await fetch(`${STRAPI_URL}/api/whats-app-agents?filters[isActive][$eq]=true`, {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
          cache: 'no-store'
        });
        
        if (!res.ok) return;
        
        const json = await res.json();
        const agents = json.data;
        
        if (agents && agents.length > 0) {
          const phone = agents[0]?.attributes?.phoneNumber || agents[0]?.phoneNumber;
          if (phone) {
            const cleanPhone = phone.replace(/[^0-9]/g, '');
            setDynamicWhatsappNumber(cleanPhone);
          }
        }
      } catch (error) {
        console.error("مشكل في جلب رقم الواتساب من Strapi:", error);
      }
    };

    fetchSettings();
  }, []);

  // دالة إرسال الرسالة للواتساب
  const sendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    // 👈 يلا مالقى حتى نمرة (مكاين تا موظف نشيط)، غيخرج ليه هاد الميساج
    if (!dynamicWhatsappNumber) {
      alert("عذرا، لا يوجد موظف متاح حاليا لاستقبال رسالتك. المرجو المحاولة لاحقا.");
      return;
    }

    const text = `السلام عليكم مختبر INCIA،
    
*الاسم:* ${formData.name}
*رقم الهاتف:* ${formData.phone}
*البريد الإلكتروني:* ${formData.email || "لم يتم الإدخال"}
*نوع الاستفسار:* ${formData.type}

*الرسالة:*
${formData.message}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${dynamicWhatsappNumber}?text=${encodedText}`;

    window.open(whatsappUrl, "_blank");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      
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
                    <h4 className="text-teal-100 font-semibold mb-1">الهاتف المحمول / واتساب</h4>
                    {/* 👈 هنا النمرة لي كطافيشا للناس ولات ديناميكية */}
                    <p className="text-white" dir="ltr">
                      {dynamicWhatsappNumber ? `+${dynamicWhatsappNumber}` : "الرقم غير متاح حاليا"}
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
              املأ الاستمارة وسنقوم بتحويلك مباشرة للتواصل معنا عبر واتساب.
            </p>

            <form onSubmit={sendToWhatsApp} className="space-y-6">
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
                <span>إرسال عبر واتساب</span>
                <span className="text-2xl">💬</span>
              </button>
            </form>
          </div>

        </div>
      </section>

    </main>
  );
}