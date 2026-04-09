'use client';
import { useState, useEffect } from 'react';

export default function StickyWhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  // هاد الكود كيخلي البوطونة تبان غير ملي الكليان يهبط شوية لتحت فالسيت
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://wa.me/212600000000?text=Bonjour,%20je%20suis%20intéressé(e)%20par%20vos%20produits"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl flex items-center gap-2 transition-all animate-bounce"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.032 2.016c-5.52 0-10 4.48-10 10 0 1.776.464 3.456 1.28 4.944L2 22l5.04-1.312c1.44.768 3.072 1.28 4.992 1.28 5.52 0 10-4.48 10-10s-4.48-10-10-10z"/>
        </svg>
        <span className="hidden md:inline font-bold">Commander via WhatsApp</span>
      </a>
    </div>
  );
}