"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Extract current locale from pathname
  const currentLocale = pathname.startsWith("/it")
    ? "it"
    : pathname.startsWith("/en")
      ? "en"
      : "it";

  // Generate path for other locale
  const getLocalizedPath = (newLocale: string) => {
    if (pathname.startsWith("/it")) {
      return pathname.replace("/it", `/${newLocale}`);
    } else if (pathname.startsWith("/en")) {
      return pathname.replace("/en", `/${newLocale}`);
    }
    return `/${newLocale}`;
  };

  return (
    <div
      className="relative flex items-center py-2 pl-4 ml-4 border-l border-white/20"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="flex items-center space-x-2 transition-colors duration-200 text-white hover:text-[#C34069]"
        aria-label="Switch Language"
      >
        <Image
          src="/images/usefull-icons/icon-language.svg"
          alt="Language"
          width={20}
          height={20}
          className="w-5 h-5"
        />
        <span className="text-sm font-light uppercase">{currentLocale}</span>
        <svg
          className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 pt-5 w-24">
          <div className="bg-black/50 backdrop-blur-sm rounded-none shadow-xl border-t-2 border-[#C34069] py-3">
            <Link
              href={getLocalizedPath("it")}
              className={`block px-6 py-3 text-sm transition-colors duration-200 ${
                currentLocale === "it"
                  ? "text-[#C34069] bg-white/10"
                  : "text-white hover:text-[#C34069] hover:bg-white/10"
              } font-light`}
            >
              IT
            </Link>
            <Link
              href={getLocalizedPath("en")}
              className={`block px-6 py-3 text-sm transition-colors duration-200 ${
                currentLocale === "en"
                  ? "text-[#C34069] bg-white/10"
                  : "text-white hover:text-[#C34069] hover:bg-white/10"
              } font-light`}
            >
              EN
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
