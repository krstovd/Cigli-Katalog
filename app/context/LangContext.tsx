"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "mk" | "en";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextType>({
  lang: "mk",
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("mk");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        const savedLang = window.localStorage.getItem("zmaga-language");
        if (savedLang === "mk" || savedLang === "en") {
          setLang(savedLang);
        }
      } catch {
        // Keep the default language when storage is unavailable.
      } finally {
        setIsInitialized(true);
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    try {
      window.localStorage.setItem("zmaga-language", lang);
    } catch {
      // Language switching still works when storage is unavailable.
    }
    document.documentElement.lang = lang;
  }, [isInitialized, lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
