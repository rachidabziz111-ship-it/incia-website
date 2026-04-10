"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">I</span>
            </div>
            <span className="font-serif text-xl font-semibold text-gray-900">
              INCIA<span className="text-teal-600">®</span>
            </span>
          </Link>

          {/* Desktop Nav (كيبان غير فالبيسي) */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-teal-600 transition">Home</Link>
            <Link href="/products" className="text-gray-700 hover:text-teal-600 transition">Products</Link>
            <Link href="/about" className="text-gray-700 hover:text-teal-600 transition">Lab</Link>
            <Link href="/wholesale" className="text-gray-700 hover:text-teal-600 transition">Wholesale</Link>
            <Link href="/contact" className="text-gray-700 hover:text-teal-600 transition">Contact</Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Button Become a Partner (مخبي فالتليفون) */}
            <Link
              href="/wholesale"
              className="hidden sm:inline-block bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition shadow-md hover:shadow-lg"
            >
              Become a Partner
            </Link>

            {/* زر القائمة فالتليفون (Hamburger Icon) */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-600 hover:text-teal-600 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                // علامة X باش تسد
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // ثلاثة الشريطات باش تفتح
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown (القائمة اللي كتهبط فالتليفون) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full shadow-lg">
          <nav className="flex flex-col px-4 pt-2 pb-6 space-y-3">
            <Link href="/" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50">Home</Link>
            <Link href="/products" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50">Products</Link>
            <Link href="/about" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50">Lab</Link>
            <Link href="/wholesale" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50">Wholesale</Link>
            <Link href="/contact" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50">Contact</Link>
            
            <Link href="/wholesale" onClick={toggleMenu} className="block w-full text-center mt-4 bg-teal-600 text-white px-5 py-3 rounded-full font-semibold shadow-md">
              Become a Partner
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}