"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLang, type Lang } from "@/app/context/LangContext";

const SEO: Record<string, Record<Lang, { title: string; description: string }>> = {
  "/": {
    mk: { title: "Декоративни гипсени цигли | Zmaga Cigli", description: "Декоративни гипсени цигли за модерен и класичен ентериер. Разгледајте 47+ модели од Zmaga Декоративни Цигли." },
    en: { title: "Decorative gypsum bricks | Zmaga Cigli", description: "Decorative gypsum bricks for modern and classic interiors. Explore 47+ models from Zmaga Decorative Bricks." },
  },
  "/catalog": {
    mk: { title: "Каталог | Zmaga Cigli", description: "Каталог на декоративни гипсени цигли Zmaga." },
    en: { title: "Catalog | Zmaga Cigli", description: "Explore the Zmaga catalog of decorative gypsum bricks." },
  },
  "/inspiration": {
    mk: { title: "Инспирација | Zmaga Cigli", description: "Идеи за уредување простор со декоративни цигли Zmaga." },
    en: { title: "Inspiration | Zmaga Cigli", description: "Interior design ideas featuring Zmaga decorative bricks." },
  },
  "/about": {
    mk: { title: "За нас | Zmaga Cigli", description: "Дознајте повеќе за Zmaga Декоративни Цигли, нашето искуство и колекцијата од 47+ модели." },
    en: { title: "About us | Zmaga Cigli", description: "Learn more about Zmaga Decorative Bricks, our experience, quality materials and collection of 47+ models." },
  },
  "/contact": {
    mk: { title: "Контакт | Zmaga Cigli", description: "Контактирајте со Zmaga Декоративни Цигли за производи, нарачки, технички прашања и соработка." },
    en: { title: "Contact | Zmaga Cigli", description: "Contact Zmaga Decorative Bricks about products, orders, technical questions and partnerships." },
  },
  "/favorites": {
    mk: { title: "Омилени модели | Zmaga Cigli", description: "Вашите омилени Zmaga декоративни цигли." },
    en: { title: "Favorite models | Zmaga Cigli", description: "Your favorite Zmaga decorative bricks." },
  },
};

export default function LanguageMetadata() {
  const pathname = usePathname();
  const { lang } = useLang();

  useEffect(() => {
    const content = (SEO[pathname] ?? SEO["/"])[lang];
    const selectors = [
      ['meta[name="description"]', "content", content.description],
      ['meta[property="og:title"]', "content", content.title],
      ['meta[property="og:description"]', "content", content.description],
      ['meta[name="twitter:title"]', "content", content.title],
      ['meta[name="twitter:description"]', "content", content.description],
    ] as const;

    const synchronize = () => {
      if (document.title !== content.title) document.title = content.title;
      if (document.documentElement.lang !== lang) document.documentElement.lang = lang;
      for (const [selector, attribute, value] of selectors) {
        document.querySelectorAll(selector).forEach((element) => {
          if (element.getAttribute(attribute) !== value) element.setAttribute(attribute, value);
        });
      }
    };

    synchronize();
    const observer = new MutationObserver(synchronize);
    observer.observe(document.head, { attributes: true, childList: true, subtree: true });
    return () => observer.disconnect();
  }, [lang, pathname]);

  return null;
}
