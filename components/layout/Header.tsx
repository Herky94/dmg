"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getMenuData } from "./getMenuData";
import { Locale } from "@/lib/translations";
import { MenuItem } from "./menuData";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const pathname = usePathname();

  // Extract locale from pathname
  const currentLocale: Locale = pathname.startsWith("/it")
    ? "it"
    : pathname.startsWith("/en")
      ? "en"
      : "it";

  // Get localized menu data
  const menuData = useMemo(() => getMenuData(currentLocale), [currentLocale]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(
    null,
  );

  // Calcola il progresso dello scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-sm">
      <div className="container-dmg">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 ">
            <Link href={`/${currentLocale}`} className="flex items-center">
              <Image
                src="/images/logos/dmg-logo-inverse.svg"
                alt="DMG Logo"
                width={120}
                height={60}
                className="h-11 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Progress Bar Central */}
          <div className="flex-1 mx-4 lg:mx-8 min-w-0">
            <div className="w-full h-[1px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/40 transition-all duration-300 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuData.map((item: MenuItem, index: number) => (
              <div
                key={item.name}
                className="relative group h-full flex items-center"
                onMouseEnter={() =>
                  item.hasDropdown && setOpenDropdown(item.name)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`py-2 text-sm font-light transition-colors duration-200 flex items-center ${
                      index === menuData.length - 1 ? "pl-4" : "px-4"
                    } ${
                      openDropdown === item.name
                        ? "text-[#C34069]"
                        : "text-white hover:text-[#C34069]"
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <svg
                        className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${
                          openDropdown === item.name ? "rotate-180" : ""
                        }`}
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
                    )}
                  </Link>
                ) : (
                  <span
                    className={`py-2 text-sm font-light transition-colors duration-200 flex items-center cursor-default ${
                      index === menuData.length - 1 ? "pl-4" : "px-4"
                    } ${
                      openDropdown === item.name
                        ? "text-[#C34069]"
                        : "text-white hover:text-[#C34069]"
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <svg
                        className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${
                          openDropdown === item.name ? "rotate-180" : ""
                        }`}
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
                    )}
                  </span>
                )}

                {/* Dropdown Menu */}
                {item.hasDropdown &&
                  item.submenu &&
                  openDropdown === item.name && (
                    <div className="absolute top-full left-0 pt-5 w-64">
                      <div className="bg-black/50 backdrop-blur-sm rounded-none shadow-xl border-t-2 border-[#C34069] py-3">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-6 py-3 text-sm text-white hover:text-[#C34069] hover:bg-white/10 font-light transition-colors duration-200"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            ))}

            {/* Language Switcher */}
            <LanguageSwitcher />
          </nav>

          {/* Mobile Language Switcher & Menu button */}
          <div className="lg:hidden ml-auto flex items-center space-x-4">
            {/* Language Switcher Mobile */}
            <LanguageSwitcher />

            {/* Menu Hamburger */}
            <button
              type="button"
              className="text-white hover:text-gray-300 cursor-pointer"
              aria-label="Toggle menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed left-0 w-full top-16 h-[calc(100vh-4rem)] bg-black/95 backdrop-blur-md z-[60] overflow-y-auto transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col py-6 px-6 space-y-2 pb-20">
          {menuData.map((item: MenuItem) => (
            <div
              key={item.name}
              className="border-b border-white/10 last:border-none"
            >
              {item.hasDropdown ? (
                <div>
                  <div className="flex items-center justify-between w-full">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="py-4 text-lg font-light text-white transition-colors hover:text-[#C34069] flex-grow"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <button
                        onClick={() =>
                          setExpandedMobileItem(
                            expandedMobileItem === item.name ? null : item.name,
                          )
                        }
                        className="py-4 text-lg font-light text-white transition-colors hover:text-[#C34069] flex-grow text-left"
                      >
                        {item.name}
                      </button>
                    )}
                    <button
                      onClick={() =>
                        setExpandedMobileItem(
                          expandedMobileItem === item.name ? null : item.name,
                        )
                      }
                      className="p-4 text-white hover:text-[#C34069] transition-colors"
                    >
                      <svg
                        className={`h-5 w-5 transform transition-transform duration-200 ${
                          expandedMobileItem === item.name ? "rotate-180" : ""
                        }`}
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
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedMobileItem === item.name
                        ? "max-h-[500px] opacity-100 mb-4"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="flex flex-col pl-4 space-y-3 border-l border-[#C34069]/30 ml-2 mt-2">
                      {item.submenu?.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block py-2 text-sm text-gray-300 hover:text-[#C34069] transition-colors pl-4"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="block py-4 text-lg font-light text-white hover:text-[#C34069] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
