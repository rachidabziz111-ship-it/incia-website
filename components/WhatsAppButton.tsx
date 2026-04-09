'use client';
import { useState, useEffect } from 'react';
import { createClient } from "next-sanity";

// إعداد الاتصال مع Sanity
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-03-09",
  useCdn: false,
});

// تعريف نوع البيانات باش الكود يكون نقي ومقاد
type Employee = {
  _id: string;
  name: string;
  role: string;
  whatsapp: string;
  imageUrl?: string;
};

export default function WhatsAppButton() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isOpen, setIsOpen] = useState(false); // هادي باش نتحكمو فالنافذة واش تبان ولا تخفى

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // كود GROQ باش نجيبو الموظفين من Sanity
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
        console.error("Failed to load WhatsApp agents", error);
      }
    };
    
    fetchEmployees();
  }, []);

  // دالة لتنظيف الرقم (كنخليو غير الأرقام باش الرابط يخدم مزيان)
  const cleanPhone = (phone: string) => phone.replace(/[^0-9]/g, '');

  // يلا مالقى حتى موظف فـ Sanity، مابينش البوطونة بمرة
  if (employees.length === 0) return null;

  return (
    <>
      {/* ---------- البوطونة العائمة ---------- */}
      <button
        onClick={() => setIsOpen(true)} // ملي كنكليكيو، كتفتح النافذة
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20bd5a] transition-transform hover:scale-110 z-40 flex items-center justify-center"
        aria-label="تواصل معنا عبر الواتساب"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
      </button>

      {/* ---------- النافذة (Modal) لي غتطلع ---------- */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 transition-opacity">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden" dir="rtl">
            
            {/* رأس النافذة */}
            <div className="bg-[#25D366] text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">اختر المستشار الطبي</h3>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 text-3xl leading-none">
                &times;
              </button>
            </div>
            
            {/* لائحة الموظفين */}
            <div className="p-5 max-h-[60vh] overflow-y-auto">
              <p className="text-gray-600 mb-5 text-sm text-center">
                المرجو اختيار أحد مستشارينا للتواصل معه مباشرة عبر الواتساب:
              </p>
              
              <div className="space-y-3">
                {employees.map((emp) => (
                  <a
                    key={emp._id}
                    href={`https://wa.me/${cleanPhone(emp.whatsapp)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 border border-gray-100 rounded-xl hover:bg-gray-50 hover:border-[#25D366] transition-all group"
                    onClick={() => setIsOpen(false)} // ملي يختار، تسد النافذة
                  >
                    {/* صورة الموظف أو أيقونة افتراضية */}
                    <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 ml-4 border border-gray-200">
                      {emp.imageUrl ? (
                        <img src={emp.imageUrl} alt={emp.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl">👤</div>
                      )}
                    </div>
                    
                    {/* معلومات الموظف */}
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800">{emp.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{emp.role || 'خدمة العملاء'}</p>
                    </div>
                    
                    {/* أيقونة السهم */}
                    <div className="text-[#25D366] bg-[#25D366]/10 p-2 rounded-full group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="transform rotate-180">
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}