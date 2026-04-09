"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { createClient } from "next-sanity";

// إعداد الاتصال مع Sanity
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

export default function FloatingCart() {
  const { cart, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false); // هادي باش نتحكمو فالسلة واش تبان
  const [isModalOpen, setIsModalOpen] = useState(false); // هادي ديال نافذة اختيار الموظف
  
  const [employees, setEmployees] = useState<Employee[]>([]);

  // جلب الموظفين من Sanity
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
        console.error("Failed to load WhatsApp agents", error);
      }
    };
    
    fetchEmployees();
  }, []);

  // يلا كانت السلة خاوية، متبانش كاع
  if (cart.length === 0) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const cleanPhone = (phone: string) => phone.replace(/[^0-9]/g, '');

  // ملي يكليكي على تأكيد الطلب، نفتحو ليه النافذة يختار الموظف
  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (employees.length === 0) {
      alert("عذرا، لا يوجد موظف متاح حاليا لاستقبال الطلبات. المرجو المحاولة لاحقا.");
      return;
    }
    
    setIsModalOpen(true);
  };

  // ملي يختار الموظف، نجمعو الطلب ونصيفطوه ليه للواتساب ديالو
  const sendOrderToWhatsApp = (employeePhone: string) => {
    let message = "سلام INCIA، بغيت ندوز هاد الطلبية (بالجملة):\n\n";
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.title}\n`;
      message += `   الكمية: ${item.quantity} | الثمن: ${item.price * item.quantity} درهم\n`;
    });
    message += `\n💰 المجموع الكلي: ${totalPrice} درهم`;
    
    setIsModalOpen(false); // نسدو النافذة
    setIsOpen(false); // نسدو السلة تا هي
    window.open(`https://wa.me/${cleanPhone(employeePhone)}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      {/* ----------------- السلة العائمة ----------------- */}
      <div className="fixed bottom-28 right-6 z-40">
        {isOpen && (
          <div className="bg-white rounded-2xl shadow-2xl p-4 mb-4 w-80 border border-gray-100 relative" dir="rtl">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full"
            >
              ✖
            </button>
            <h3 className="font-bold text-lg mb-4 text-gray-800 pr-8">طلبيتك الحالية</h3>
            
            <div className="max-h-60 overflow-y-auto mb-4 space-y-3 pl-1">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm border-b pb-2 border-gray-100">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-700">{item.title}</div>
                    <div className="text-gray-500">الكمية: {item.quantity} × {item.price} درهم</div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg font-bold transition-colors ml-2"
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-3 mb-4">
              <div className="flex justify-between font-bold text-lg">
                <span>المجموع:</span>
                <span className="text-teal-600">{totalPrice} درهم</span>
              </div>
            </div>

            {/* 👈 البوطونة دابا كتفتح النافذة (Modal) */}
            <button
              onClick={handleOpenModal}
              className="w-full bg-[#25D366] hover:bg-[#1ebe57] text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-transform active:scale-95 shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
              تأكيد الطلب عبر الواتساب
            </button>
          </div>
        )}

        {/* أيقونة السلة المغلقة */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full shadow-2xl relative flex items-center justify-center transition-transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
            {totalItems}
          </span>
        </button>
      </div>

      {/* ----------------- النافذة (Modal) لاختيار الموظف لإرسال الطلب ----------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100" dir="rtl">
            
            <div className="bg-[#25D366] text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-xl">اختر المستشار لتأكيد الطلب</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white hover:text-gray-200 text-3xl leading-none focus:outline-none">
                &times;
              </button>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <p className="text-gray-600 mb-6 text-sm text-center bg-green-50 p-3 rounded-lg border border-green-100">
                تم تجهيز تفاصيل طلبيتك بنجاح! المرجو اختيار أحد مستشارينا لإرسال الطلب إليه عبر الواتساب:
              </p>
              
              <div className="space-y-3">
                {employees.map((emp) => (
                  <button
                    key={emp._id}
                    onClick={() => sendOrderToWhatsApp(emp.whatsapp)} // ملي كيكليكي، كتمشي الكوموند للموظف
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
                      <p className="text-sm text-gray-500 mt-1">{emp.role || 'مستشار المبيعات'}</p>
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
    </>
  );
}