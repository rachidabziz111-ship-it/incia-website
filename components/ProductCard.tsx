"use client";

// زدينا useState هنا باش نتحكمو فالكمية
import { useState } from "react"; 
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();

  const { id, title, description, basePrice, moq, images } = product;

  const displayTitle = title || "منتج بدون اسم";
  const displayPrice = basePrice || 0;
  const displayMoq = moq || 1;

  // هادي هي الذاكرة ديال العداد، كيبدا من الكمية الأدنى (MOQ)
  const [selectedQuantity, setSelectedQuantity] = useState(displayMoq);

  let displayDescription = "لا يوجد وصف"; 
  if (typeof description === 'string') {
    displayDescription = description;
  } else if (Array.isArray(description) && description[0]?.children?.[0]?.text) {
    displayDescription = description[0].children[0].text;
  }

  let imageUrl = "/placeholder-product.jpg"; 
  if (images && Array.isArray(images) && images.length > 0 && images[0].url) {
      imageUrl = `http://localhost:1337${images[0].url}`;
  }

  // دوال الزيادة والنقصان
  const increaseQuantity = () => setSelectedQuantity((prev:any) => prev + 1);
  const decreaseQuantity = () => {
    // باش الكليان ميهبطش على الكمية الأدنى
    if (selectedQuantity > displayMoq) {
      setSelectedQuantity((prev:any) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: id,
      title: displayTitle,
      price: displayPrice,
      quantity: selectedQuantity, // كنصيفطو الكمية لي عزل الكليان
      moq: displayMoq,
    });
    alert(`تمت إضافة ${selectedQuantity} من ${displayTitle} إلى السلة!`);
    
    // نرجعو العداد للكمية الأدنى من بعد ما يضيفو للسلة
    setSelectedQuantity(displayMoq); 
  };

  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
      <Link href={`/product/${id}`} className="relative h-64 bg-gray-50 flex items-center justify-center p-6">
        <img
          src={imageUrl}
          alt={displayTitle}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 text-lg mb-1">{displayTitle}</h3>
        <div className="text-sm text-gray-600 mb-4 line-clamp-2">{displayDescription}</div>
        
        <div className="mt-auto pt-4 border-t border-gray-50 flex flex-col gap-4">
          
          {/* معلومات الثمن والكمية الأدنى */}
          <div>
            <div className="text-xs text-gray-500 mb-1">الكمية الأدنى للطلب: {displayMoq}</div>
            <div className="font-bold text-teal-700 text-lg">
              {displayPrice} درهم <span className="text-sm font-normal text-gray-500">/ للوحدة</span>
            </div>
          </div>
          
          {/* قسم العداد وزر الإضافة */}
          <div className="flex justify-between items-center gap-2">
            
            {/* العداد (- / +) */}
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50 h-10 w-28">
              {/* زر الزيادة */}
              <button 
                onClick={increaseQuantity}
                className="w-8 h-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors font-bold"
              >
                +
              </button>
              
              {/* الرقم */}
              <span className="flex-grow text-center text-sm font-bold text-gray-800">
                {selectedQuantity}
              </span>
              
              {/* زر النقصان */}
              <button 
                onClick={decreaseQuantity}
                disabled={selectedQuantity <= displayMoq}
                className="w-8 h-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors font-bold disabled:opacity-30 disabled:cursor-not-allowed"
              >
                -
              </button>
            </div>
            
            {/* بوطونة الإضافة للسلة */}
            <button 
              onClick={handleAddToCart}
              className="flex-grow bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white h-10 px-4 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 font-bold text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              أضف
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}