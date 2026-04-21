"use client";

import { useLanguage } from "@/lib/i18n/context";
import { Locale } from "@/lib/i18n/translations";

const OPTIONS: { locale: Locale; label: string; flag: string }[] = [
  { locale: "ar", label: "AR", flag: "🇲🇦" },
  { locale: "en", label: "EN", flag: "🇬🇧" },
  { locale: "fr", label: "FR", flag: "🇫🇷" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 bg-gray-100 rounded-full p-0.5 border border-gray-200">
      {OPTIONS.map(({ locale: l, label, flag }) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          title={flag}
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide transition-all duration-200 ${
            l === locale
              ? "bg-[#0a3b33] text-white shadow-sm"
              : "text-gray-500 hover:text-[#0a3b33] hover:bg-white"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
