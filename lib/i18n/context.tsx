"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Locale, defaultLocale, rtlLocales, T } from "./translations";

type LangCtx = {
  locale: Locale;
  t: T;
  setLocale: (l: Locale) => void;
  isRTL: boolean;
};

const Ctx = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  // استرجاع اللغة المحفوظة عند التحميل
  useEffect(() => {
    const saved = localStorage.getItem("incia_locale") as Locale | null;
    if (saved && saved in translations) {
      setLocaleState(saved);
    }
  }, []);

  // تحديث html dir/lang و localStorage عند تغيير اللغة
  useEffect(() => {
    const isRTL = rtlLocales.includes(locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    localStorage.setItem("incia_locale", locale);
  }, [locale]);

  const setLocale = (l: Locale) => setLocaleState(l);
  const isRTL = rtlLocales.includes(locale);
  const t = translations[locale];

  return (
    <Ctx.Provider value={{ locale, t, setLocale, isRTL }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
