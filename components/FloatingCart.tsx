"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function FloatingCart() {
  const { cart, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  
  const [agentPhone, setAgentPhone] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
        const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        
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
            setAgentPhone(cleanPhone);
          }
        }
      } catch (error) {
        console.error("Failed to load WhatsApp agent", error);
      }
    };
    
    fetchAgent();
  }, []);

  if (cart.length === 0) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!agentPhone) {
      alert("عذرا، لا يوجد موظف متاح حاليا لاستقبال الطلبات. المرجو المحاولة لاحقا.");
      return;
    }

    let message = "سلام INCIA، بغيت ندوز هاد الطلبية (بالجملة):\n\n";
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.title}\n`;
      message += `   الكمية: ${item.quantity} | الثمن: ${item.price * item.quantity} درهم\n`;
    });
    message += `\n💰 المجموع الكلي: ${totalPrice} درهم`;
    
    window.open(`https://wa.me/${agentPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed bottom-28 right-6 z-50">
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl p-4 mb-4 w-80 border border-gray-100 relative">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          >
            ✖
          </button>
          <h3 className="font-bold text-lg mb-4 text-gray-800">طلبيتك الحالية</h3>
          
          <div className="max-h-60 overflow-y-auto mb-4 space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm border-b pb-2">
                <div>
                  <div className="font-semibold text-gray-700">{item.title}</div>
                  <div className="text-gray-500">الكمية: {item.quantity} x {item.price} درهم</div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 font-bold px-2"
                >
                  حذف
                </button>
              </div>
            ))}
          </div>

          <div className="border-t pt-3 mb-4">
            <div className="flex justify-between font-bold text-lg">
              <span>المجموع:</span>
              <span className="text-teal-600">{totalPrice} درهم</span>
            </div>
          </div>

          <button
            onClick={handleWhatsAppOrder}
            className="w-full bg-[#25D366] hover:bg-[#1ebe57] text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-colors shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
            </svg>
            تأكيد الطلب عبر الواتساب
          </button>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full shadow-2xl relative flex items-center justify-center transition-transform hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
          {cart.length}
        </span>
      </button>
    </div>
  );
}